# How to Connect Articulate Spaces Enquiry Forms to Google Sheets

This guide walks you through connecting both enquiry forms (Hero form and Contact section form) directly to a Google Sheet using Google Apps Script. 

**Benefits:**
- 100% Free, no monthly fees, and no third-party account required.
- Enquiries are instantly saved to your personal Google Sheet.
- Preserves phone formatting (`+91 ...`), captures timestamps, and identifies which form on the page was submitted.

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name your sheet at the top: e.g. **Articulate Spaces Enquiries**.
3. *(Optional)* You can leave the sheet completely empty — our script will automatically create and format the header row for you upon the first submission! Or if you prefer to write the column headers yourself in Row 1:
   - `Timestamp`
   - `Form Name`
   - `Full Name`
   - `Phone / WhatsApp`
   - `Email`
   - `Project Type`
   - `Location`
   - `Approx. Area`
   - `Message / Details`

---

## Step 2: Open Google Apps Script

1. In the Google Sheets top menu, click **Extensions** > **Apps Script**.
2. A new tab will open with the code editor. Rename the project to **Articulate Spaces Form Backend** (at the top left).
3. Select everything in the editor window (`Code.gs`) and delete it.
4. Open the file `google-apps-script.js` in this VS Code workspace, copy the entire contents, and paste it into the Apps Script editor.
5. Click the **Save** icon (floppy disk) or press `Ctrl + S`.

---

## Step 3: Deploy as a Web App

1. In the top right corner of the Apps Script editor, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (**Select type**) next to the deployment type and select **Web app**.
3. Fill in the deployment details:
   - **Description**: `Enquiry Form v1`
   - **Execute as**: `Me (your email)`
   - **Who has access**: **`Anyone`** *(⚠️ IMPORTANT: Must be set to "Anyone", otherwise website visitors will not be able to submit enquiries).*
4. Click **Deploy**.
5. Google will prompt you to **Authorize access**:
   - Click **Authorize access**.
   - Choose your Google account.
   - If you see a *"Google hasn't verified this app"* warning, click **Advanced** (bottom left), then click **Go to Articulate Spaces Form Backend (unsafe)**.
   - Click **Allow**.
6. After authorization finishes, copy the **Web app URL**. It looks like:
   ```text
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 4: Add the URL to `script.js`

1. Open `script.js` in VS Code.
2. Find the constant at the top:
   ```javascript
   const GOOGLE_SHEET_SCRIPT_URL = "";
   ```
3. Paste your Web App URL between the quotes:
   ```javascript
   const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec";
   ```
4. Save `script.js`.

---

## Step 5: Test the Integration

1. In VS Code, right-click `index.html` and choose **Open with Live Server** (or open it through your local web server).
   > *Note: For security reasons, modern browsers block cross-origin requests from `file:///` URLs. Always test through a local server like VS Code Live Server or when hosted on Netlify/Vercel/GitHub Pages.*
2. Fill out either enquiry form on the page and click **Send Enquiry ↗**.
3. The button will show "Sending Enquiry...", and once submitted, a green confirmation message will appear:
   > ✓ Thank you! Your enquiry has been sent successfully. We will get back to you shortly.
4. Check your Google Sheet — a new row with all the enquiry details and timestamp will be there!

---

## Bonus: Get Email Notifications for New Enquiries

If you want Google to automatically notify you via email whenever someone submits an enquiry:

1. In your Google Sheet, click **Tools** > **Notification rules**.
2. Under "Notify me when...", select **A user submits a form** or **Any changes are made**.
3. Under "Notify me with...", select **Email - right away**.
4. Click **Save**.

---

## Troubleshooting

- **Form says "Form submission setup required"**: Make sure you pasted your deployment URL into `script.js`.
- **Form submission gives an error**:
  1. Verify in Google Apps Script that **Who has access** is set to **Anyone**. If it was set to "Only myself", click **Deploy** > **Manage deployments** > edit > change to **Anyone** > Deploy.
  2. If you make any changes to the Apps Script code in the future, you must create a **New deployment** or edit the existing deployment to a **New version** for the changes to take effect.

