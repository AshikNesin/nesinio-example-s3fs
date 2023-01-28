require('dotenv').config()

const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
}

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const fs = require('@cyclic.sh/s3fs/promises')(S3_BUCKET_NAME, config)

const user = {
    name: 'Ashik Nesin',
    website: "https://AshikNesin.com"
}

async function run() {


    await fs.writeFile('s3fs/user.json', JSON.stringify(user))

    console.log(`Saved json file to AWS S3`);

    const currentPath = `${process.cwd()}/s3fs/user.json`

    console.log({ currentPath });

    const json = JSON.parse(await fs.readFile(currentPath))

    console.log(`Retrive json file from AWS S3`);

    console.log(JSON.stringify(json, null, 2));
}

run()
