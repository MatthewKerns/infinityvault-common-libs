// Quick test to verify database connection fix
import { createWebsiteDatabase } from "@infinityvault/website-middleware";

async function testDatabaseConnection() {
  try {
    console.log("🔍 Testing database connection...");

    const { db, sql } = await createWebsiteDatabase();

    console.log("✅ Database connection created successfully");
    console.log("✅ Database client:", typeof db);
    console.log("✅ SQL client:", typeof sql);

    // Test basic query
    const result = await sql("SELECT 1 as test");
    console.log("✅ Test query result:", result);

    console.log("🎉 Database connection test passed!");
  } catch (error) {
    console.error("❌ Database connection test failed:", error.message);
    console.error("Stack:", error.stack);
  }
}

testDatabaseConnection();
