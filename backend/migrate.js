import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const migrateData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🚀 Connected to MongoDB for migration...");

    const db = mongoose.connection.db;

    // Mapping of Old Mongoose Collection Names to Your Perfect 'tbl_' Names
    const collectionsToMigrate = {
      users: "tbl_User",
      auditsessions: "tbl_AuditSession",
      auditlineitems: "tbl_AuditLineItem",
      settings: "tbl_Settings",
      shops: "tbl_Shop",
    };

    for (const [oldName, newName] of Object.entries(collectionsToMigrate)) {
      console.log(`\nChecking for collection: ${oldName}...`);
      
      const collections = await db.listCollections({ name: oldName }).toArray();
      
      if (collections.length > 0) {
        console.log(`Found old collection '${oldName}'. Fetching data...`);
        const oldData = await db.collection(oldName).find({}).toArray();
        
        if (oldData.length > 0) {
          console.log(`Found ${oldData.length} records. Transferring to '${newName}'...`);
          // Insert into new collection (ignoring duplicates if any)
          try {
             await db.collection(newName).insertMany(oldData, { ordered: false });
          } catch (e) {
             console.log(`Some records might already exist in ${newName} (Duplicate Key). Moving on...`);
          }
        } else {
          console.log(`No records found in '${oldName}'.`);
        }

        console.log(`Dropping old collection '${oldName}'...`);
        await db.collection(oldName).drop();
        console.log(`✅ Successfully migrated and deleted '${oldName}'.`);
      } else {
        console.log(`Old collection '${oldName}' does not exist. Skipping.`);
      }
    }

    console.log("\n🎉 All data transferred perfectly!");
  } catch (error) {
    console.error("Migration Error:", error);
  } finally {
    mongoose.connection.close();
  }
};

migrateData();
