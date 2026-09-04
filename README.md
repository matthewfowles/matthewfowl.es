# Matt Fowles - Personal Site

Personal hub for Matt Fowles at [mattfowl.es](https://mattfowl.es)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Analytics**: Vercel Analytics + Speed Insights
- **Hosting**: Vercel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This site is deployed on Vercel. Any push to the `master` branch will automatically deploy to production.

### DNS Migration from Netlify to Vercel

After the Vercel project is set up and deployed, configure the domain in the Vercel dashboard:

1. **Add Domain in Vercel**:
   - Go to Project Settings → Domains
   - Add `mattfowl.es` as the primary domain
   - Vercel will provide DNS records to configure

2. **Update DNS Records** (at your domain registrar):
   - For apex domain (`mattfowl.es`):
     - **Option A** (Recommended): Use A records pointing to Vercel's IP addresses:
       - `76.76.21.21`
     - **Option B**: If your registrar supports ALIAS/ANAME records, point to `cname.vercel-dns.com`
   
   - If using A records, also add these for redundancy:
     - `76.76.21.22`
     - `76.76.21.23`
     - `76.76.21.24`

3. **CNAME for www** (optional):
   - If you want `www.mattfowl.es` to work, add:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`

4. **Remove Netlify DNS**:
   - After Vercel DNS is configured and propagated (can take up to 48 hours), remove the old Netlify DNS records
   - You can check DNS propagation at https://www.whatsmydns.net/

5. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - This happens automatically after DNS is configured

### Vercel CLI Deployment

Alternatively, deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Migration Notes

- Migrated from Gatsby 5 to Next.js 15 App Router
- Replaced Splitbee analytics with Vercel Analytics
- Updated positioning to reflect AI-assisted product engineering
- Maintained dark/light theme toggle functionality
- All images moved to `/public` directory
- SEO handled via Next.js metadata API
