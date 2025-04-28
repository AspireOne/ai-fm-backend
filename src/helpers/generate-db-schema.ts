import * as dotenv from "dotenv";
import { join } from "path";
import * as fs from "fs";
import { pool } from "../providers/kysely-dialect";
import { Paths } from "./paths";

dotenv.config();

// Define the result type for your schema inspection query
interface SchemaInspectionResult {
  table_name: string;
  column_name: string;
  data_type: string;
  full_data_type: string;
  nullable: "NULL" | "NOT NULL";
  default_value: string;
  constraints: string;
}

// Define path for the CSV file
const DB_SCHEMA_PATH = Paths.dbSchema;

async function generateDbSchema() {
  // Read SQL query from file
  const sqlFilePath = join(__dirname, "get_database_schema.sql");
  const queryString = fs.readFileSync(sqlFilePath, "utf8");

  try {
    // Execute the query using the pool directly
    const result = await pool.query<SchemaInspectionResult>(queryString);
    return result.rows;
  } catch (error) {
    console.error("Error executing schema inspection query:", error);
    throw error;
  }
}

// Function to convert schema info to CSV
function convertToCSV(data: SchemaInspectionResult[]): string {
  // Define CSV headers
  const headers = [
    "table_name",
    "column_name",
    "data_type",
    "full_data_type",
    "nullable",
    "default_value",
    "constraints",
  ];

  // Create header row
  let csvContent = headers.join(",") + "\n";

  // Add data rows
  data.forEach((row) => {
    const values = headers.map((header) => {
      // Get the value for this header
      const value = row[header as keyof SchemaInspectionResult];
      // Escape quotes and wrap in quotes if the value contains commas or quotes
      const stringValue = String(value || "");
      if (stringValue.includes(",") || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvContent += values.join(",") + "\n";
  });

  return csvContent;
}

// Example usage
generateDbSchema()
  .then((schemaInfo) => {
    // console.table(schemaInfo);

    // Convert to CSV
    const csvContent = convertToCSV(schemaInfo);

    // Ensure the directory exists
    const dirPath = join(Paths.projectRoot, "src", "resources");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Save to file
    fs.writeFileSync(DB_SCHEMA_PATH, csvContent);
    console.log(`Schema exported to CSV at: ${DB_SCHEMA_PATH}`);
  })
  .catch((error) => {
    console.error("Failed to inspect schema:", error);
  });
