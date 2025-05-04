// check-youtube-urls.js
// No dependencies required - uses built-in fetch API (Node.js v18+)

// List of songs with their URLs
const songs = [
  {
    title: "Pure Shores - All Saints",
    url: "https://www.youtube.com/watch?v=dVNdTXEJv1A",
  },
  { title: "1 Thing - Amerie", url: "https://www.youtube.com/watch?v=bbqVg_23otg" },
  {
    title: "Gimme More - Britney Spears",
    url: "https://www.youtube.com/watch?v=elueA2rofoo",
  },
  {
    title: "The Rhythm of the Night - Corona",
    url: "https://www.youtube.com/watch?v=OnT58cIJSpw",
  },
  {
    title: "Glamorous - Fergie feat. Ludacris",
    url: "https://www.youtube.com/watch?v=q0SyUgw98tE",
  },
  {
    title: "Adult Education - Hall & Oates",
    url: "https://www.youtube.com/watch?v=jxcZAHTyVCI",
  },
  {
    title: "Don't Wanna Fall In Love - Jane Child",
    url: "https://www.youtube.com/watch?v=zWd__w5UWVc",
  },
  {
    title: "Work (Freemasons Remix) - Kelly Rowland",
    url: "https://www.youtube.com/watch?v=XriUvCZL93c",
  },
  { title: "Scandalous - Mis-Teeq", url: "https://www.youtube.com/watch?v=3-yYY5p7pMU" },
  {
    title: "Lady (Hear Me Tonight) - Modjo",
    url: "https://www.youtube.com/watch?v=mMfxI3r_LyA",
  },
  { title: "Anthem - N-Joi", url: "https://www.youtube.com/watch?v=S8QqDE_T0L4" },
  {
    title: "West End Girls - Pet Shop Boys",
    url: "https://www.youtube.com/watch?v=p3j2NYZ8FKs",
  },
  {
    title: "Only Girl (In The World) - Rihanna",
    url: "https://www.youtube.com/watch?v=pa14VNsdSYM",
  },
  {
    title: "With Every Heartbeat - Robyn & Kleerup",
    url: "https://www.youtube.com/watch?v=pPD8Ja64mRU",
  },
  {
    title: "Music Sounds Better With You - Stardust",
    url: "https://www.youtube.com/watch?v=FQlAEiCb8m0",
  },
  {
    title: "Everything She Wants - Wham!",
    url: "https://www.youtube.com/watch?v=Yf_Lwe6p-Cg",
  },
  {
    title: "I Want It That Way - Backstreet Boys",
    url: "https://www.youtube.com/watch?v=4fndeDfaWCg",
  },
  {
    title: "Meet Me Halfway - The Black Eyed Peas",
    url: "https://www.youtube.com/watch?v=I7HahVwYpwo",
  },
  {
    title: "On Our Own - Bobby Brown",
    url: "https://www.youtube.com/watch?v=pd_b-ecraF8",
  },
  {
    title: "Smalltown Boy - Bronski Beat",
    url: "https://www.youtube.com/watch?v=88sARuFu-tc",
  },
  { title: "Me & U - Cassie", url: "https://www.youtube.com/watch?v=sSOtIHUJbjk" },
  {
    title: "Days Go By - Dirty Vegas",
    url: "https://www.youtube.com/watch?v=M51rijkxa_4",
  },
  {
    title: "Wait - Robert Howard & Kym Mazelle",
    url: "https://www.youtube.com/watch?v=fNKEXk7H1go",
  },
  {
    title: "Feel Good Inc. - Gorillaz feat. De La Soul",
    url: "https://www.youtube.com/watch?v=HyHNuVaZJ-k",
  },
  { title: "New Sensation - INXS", url: "https://www.youtube.com/watch?v=VFO08nVpZFI" },
  { title: "Alright - Jamiroquai", url: "https://www.youtube.com/watch?v=9kXiLeBXzG4" },
  { title: "Applause - Lady Gaga", url: "https://www.youtube.com/watch?v=pco91kroVgQ" },
  {
    title: "Living In A Box - Living In A Box",
    url: "https://www.youtube.com/watch?v=mHzfhU8t5i8",
  },
  { title: "Tennis Court - Lorde", url: "https://www.youtube.com/watch?v=D8Ymd-OCucs" },
  { title: "Bad Girls - M.I.A.", url: "https://www.youtube.com/watch?v=2uYs0gJD-LE" },
  { title: "Midnight City - M83", url: "https://www.youtube.com/watch?v=dX3k_QDnzHE" },
  {
    title: "Cooler Than Me - Mike Posner",
    url: "https://www.youtube.com/watch?v=mqWq7BYvlnI",
  },
  {
    title: "The Time Is Now - Moloko",
    url: "https://www.youtube.com/watch?v=kl8mpAvTm_Y",
  },
  {
    title: "Tape Loop (Shortcheeba Mix) - Morcheeba",
    url: "https://www.youtube.com/watch?v=F5CWexEEh9I",
  },
  {
    title: "Moves Like Jagger - Maroon 5 feat. Christina Aguilera",
    url: "https://www.youtube.com/watch?v=iEPTlhBmwRg",
  },
  {
    title: "Promises, Promises - Naked Eyes",
    url: "https://www.youtube.com/watch?v=WBupia9oidU",
  },
  {
    title: "Send Me an Angel '89 - Real Life",
    url: "https://www.youtube.com/watch?v=0R6WIbx8ysE",
  },
  {
    title: "Kids - Robbie Williams & Kylie Minogue",
    url: "https://www.youtube.com/watch?v=cvn6eYJh-0c",
  },
  {
    title: "Something Got Me Started (Hurley's House Mix) - Simply Red",
    url: "https://www.youtube.com/watch?v=SEUqRaA0pns",
  },
  {
    title: "Let's Go All the Way - Sly Fox",
    url: "https://www.youtube.com/watch?v=X-tYprm1WRo",
  },
  {
    title: "6 Underground - Sneaker Pimps",
    url: "https://www.youtube.com/watch?v=2eBZqmL8ehg",
  },
  {
    title: "Tell It to My Heart - Taylor Dayne",
    url: "https://www.youtube.com/watch?v=Ud6sU3AclT4",
  },
];

// Function to check if a YouTube URL is valid
async function checkYouTubeURL(song) {
  try {
    // Using AbortController to implement a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    // Make a HEAD request to check if URL is valid
    const response = await fetch(song.url, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Clear the timeout
    clearTimeout(timeoutId);

    return {
      title: song.title,
      url: song.url,
      valid: response.ok || response.status === 303, // YouTube sometimes returns 303
      status: response.status,
    };
  } catch (error) {
    return {
      title: song.title,
      url: song.url,
      valid: false,
      error: error.name === "AbortError" ? "Request timed out" : error.message,
    };
  }
}

// More accurate check that examines the page content for video availability
async function deepCheckYouTubeURL(song) {
  try {
    // Using AbortController to implement a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    // Make a GET request to check video content
    const response = await fetch(song.url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Clear the timeout
    clearTimeout(timeoutId);

    if (!response.ok && response.status !== 303) {
      return {
        title: song.title,
        url: song.url,
        valid: false,
        status: response.status,
        reason: `HTTP status: ${response.status}`,
      };
    }

    // Get the page content
    const html = await response.text();

    // Check for patterns that indicate the video is unavailable
    const isUnavailable =
      html.includes("This video isn't available anymore") ||
      html.includes("This video is unavailable") ||
      html.includes("Video unavailable") ||
      html.includes("This video has been removed");

    return {
      title: song.title,
      url: song.url,
      valid: !isUnavailable,
      status: response.status,
      reason: isUnavailable ? "Video unavailable" : "Video appears to be available",
    };
  } catch (error) {
    return {
      title: song.title,
      url: song.url,
      valid: false,
      error: error.name === "AbortError" ? "Request timed out" : error.message,
    };
  }
}

// Main function to test all URLs
async function testAllURLs() {
  console.log("Starting URL validation check...");

  // Use Promise.allSettled to ensure all promises complete, even if some fail
  const results = await Promise.allSettled(songs.map((song) => checkYouTubeURL(song)));

  // Print results
  console.log("\nResults:");
  console.log("========\n");

  let validCount = 0;
  let invalidCount = 0;
  let errorCount = 0;

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      const data = result.value;

      if (data.valid) {
        console.log(`✅ VALID: ${data.title}`);
        console.log(`   URL: ${data.url}`);
        console.log(`   Status: ${data.status}`);
        validCount++;
      } else {
        console.log(`❌ INVALID: ${data.title}`);
        console.log(`   URL: ${data.url}`);
        console.log(`   Error: ${data.error || "Unknown error"}`);
        invalidCount++;
      }
    } else {
      console.log(`⚠️ ERROR: ${songs[index].title}`);
      console.log(`   URL: ${songs[index].url}`);
      console.log(`   Error: ${result.reason}`);
      errorCount++;
    }
    console.log(""); // Empty line for readability
  });

  // Print summary
  console.log("Summary:");
  console.log(`Total URLs checked: ${results.length}`);
  console.log(`Valid URLs: ${validCount}`);
  console.log(`Invalid URLs: ${invalidCount}`);
  console.log(`Error during check: ${errorCount}`);

  // Offer deeper check for invalid URLs
  if (invalidCount > 0) {
    console.log("\nPerforming deeper check on invalid URLs...");

    // Get list of invalid URLs
    const invalidSongs = results
      .filter((r, i) => r.status === "fulfilled" && !r.value.valid)
      .map((r, i) => songs[results.findIndex((res, idx) => res === r)]);

    // Perform deeper check
    const deepResults = await Promise.allSettled(
      invalidSongs.map((song) => deepCheckYouTubeURL(song)),
    );

    console.log("\nDeep Check Results:");
    console.log("==================\n");

    deepResults.forEach((result) => {
      if (result.status === "fulfilled") {
        const data = result.value;

        if (data.valid) {
          console.log(`✅ ACTUALLY VALID: ${data.title}`);
          console.log(`   URL: ${data.url}`);
          console.log(`   Status: ${data.status}`);
          console.log(`   Reason: ${data.reason}`);
        } else {
          console.log(`❌ CONFIRMED INVALID: ${data.title}`);
          console.log(`   URL: ${data.url}`);
          console.log(`   Reason: ${data.reason || data.error || "Unknown error"}`);
        }
      } else {
        console.log(`⚠️ ERROR DURING DEEP CHECK: ${result.reason}`);
      }
      console.log(""); // Empty line for readability
    });
  }
}

// Run the test
testAllURLs().catch((error) => {
  console.error("An error occurred:", error);
});
