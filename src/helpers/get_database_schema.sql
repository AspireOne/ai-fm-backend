WITH constraints AS (
    SELECT
        tc.table_schema,
        tc.table_name,
        kcu.column_name,
        string_agg(DISTINCT tc.constraint_type, ', ') as constraint_types
    FROM information_schema.table_constraints tc
             JOIN information_schema.key_column_usage kcu
                  ON tc.constraint_name = kcu.constraint_name
                      AND tc.table_schema = kcu.table_schema
    WHERE tc.table_schema = 'public'
    GROUP BY tc.table_schema, tc.table_name, kcu.column_name
)
SELECT
    t.table_name,
    c.column_name,
    c.data_type,
    CASE
        WHEN c.character_maximum_length IS NOT NULL
            THEN c.data_type || '(' || c.character_maximum_length || ')'
        WHEN c.numeric_precision IS NOT NULL
            THEN c.data_type || '(' || c.numeric_precision || ',' || c.numeric_scale || ')'
        ELSE c.data_type
        END as full_data_type,
    CASE
        WHEN c.is_nullable = 'YES' THEN 'NULL'
        ELSE 'NOT NULL'
        END as nullable,
    COALESCE(c.column_default, '') as default_value,
    COALESCE(con.constraint_types, '') as constraints
FROM information_schema.tables t
         JOIN information_schema.columns c
              ON t.table_name = c.table_name
                  AND t.table_schema = c.table_schema
         LEFT JOIN constraints con
                   ON con.table_name = c.table_name
                       AND con.column_name = c.column_name
WHERE t.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
ORDER BY
    t.table_name,
    c.ordinal_position;
