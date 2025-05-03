/**
 * Download information for a single YouTube download task
 */
export interface DownloadTask {
  /** YouTube URL to download from */
  youtubeUrl: string;
  /** Full path where the MP3 file should be saved */
  outputPath: string;
}

/**
 * Result of a bulk download operation
 */
export interface BulkDownloadResult {
  /** Paths of successfully downloaded files */
  successful: string[];
  /** Errors that occurred during download */
  failed: { task: DownloadTask; error: Error }[];
  /** Total time taken in milliseconds */
  timeTakenMs: number;
}

/**
 * Options for bulk YouTube audio downloads
 */
export interface BulkDownloadOptions {
  /** Maximum number of concurrent downloads (default: 3) */
  maxConcurrent?: number;
  /** Whether to continue on error (default: true) */
  continueOnError?: boolean;
  /** Progress callback function */
  onProgress?: (completed: number, total: number, currentTask?: DownloadTask) => void;
}
