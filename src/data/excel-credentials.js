const path = require('node:path');
const xlsx = require('xlsx');

function readSignupCredentials() {
  const workbookPath = path.join(__dirname, 'signup-credentials.xlsx');
  const workbook = xlsx.readFile(workbookPath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const [credentials] = xlsx.utils.sheet_to_json(worksheet);

  if (!credentials?.username || !credentials?.password) {
    throw new Error('Excel signup data must contain username and password columns');
  }

  return credentials;
}

module.exports = { readSignupCredentials };