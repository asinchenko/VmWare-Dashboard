import {GridFSBucket, MongoClient} from 'mongodb';
import xlsx from 'xlsx';
import fs from'fs';



async function uploadExcelAsBlob(uri, database, collection, filePath, fileName) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(database);
    const excelCollection = db.collection(collection);

    const workbook = xlsx.readFile(filePath);
    const jsonData = JSON.stringify(workbook);
    const buffer = Buffer.from(jsonData, 'utf-8');

    const fileData = {
      name: fileName,
      data: buffer
    };

    await excelCollection.insertOne(fileData);

    console.log('Excel file uploaded as blob');
  } catch (error) {
    console.error('Error uploading Excel file:', error);
  } finally {
    client.close();
    console.log('Disconnected from MongoDB');
  }
}


// Usage example:
const uri = 'mongodb://10.0.78.226:27018/'; // Replace with your MongoDB connection string
const database = 'dashboard';
const collection = 'excel';
const filePath = './HPE_DC-Astana.xlsx'; // Replace with the path to your Excel file
const fileName = 'HPE_DC-Astana.xlsx';

uploadExcelAsBlob(uri, database, collection, filePath, fileName);