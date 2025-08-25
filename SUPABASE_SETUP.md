# Supabase Backend Setup Guide

## Overview
This project uses Supabase as the backend database and authentication service. The backend includes user management, order processing, product management, and contact forms.

## Prerequisites
1. Node.js 18+ installed
2. Supabase CLI installed: `npm install -g supabase`
3. A Supabase project created at [supabase.com](https://supabase.com)

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Clerk Configuration (if using)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Database Schema Setup

### 1. Run the Migration
The database schema is defined in `supabase/migrations/20250101000000_initial_schema.sql`. To apply it:

```bash
# Start Supabase locally
supabase start

# Apply the migration
supabase db reset

# Or apply specific migration
supabase migration up
```

### 2. Database Tables Created
- **profiles**: User profile information
- **products**: Product catalog
- **orders**: Customer orders with measurements
- **contacts**: Contact form submissions

### 3. Row Level Security (RLS)
All tables have RLS enabled with appropriate policies:
- Users can only access their own data
- Public read access for products
- Authenticated users can create orders and contacts

## Local Development

### Start Supabase Locally
```bash
supabase start
```

This will start:
- PostgreSQL database on port 54322
- Supabase API on port 54321
- Supabase Studio on port 54323
- Email testing server on port 54324

### Stop Supabase Locally
```bash
supabase stop
```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin only)

## Type Generation

The project includes TypeScript types in `types/supabase.ts`. To regenerate types after schema changes:

```bash
supabase gen types typescript --local > types/supabase.ts
```

## Common Issues and Solutions

### 1. Environment Variables Not Set
**Error**: "Missing required environment variable"
**Solution**: Create `.env.local` file with Supabase credentials

### 2. Database Connection Failed
**Error**: "Connection failed"
**Solution**: 
- Check if Supabase is running: `supabase status`
- Verify environment variables
- Restart Supabase: `supabase restart`

### 3. RLS Policy Errors
**Error**: "Row Level Security policy violation"
**Solution**: 
- Check if user is authenticated
- Verify RLS policies are correctly applied
- Check user permissions

### 4. Type Mismatches
**Error**: TypeScript compilation errors
**Solution**: 
- Regenerate types: `supabase gen types typescript --local`
- Check if database schema matches types
- Update types manually if needed

## Production Deployment

### 1. Set Production Environment Variables
```bash
# In your hosting platform (Vercel, Netlify, etc.)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

### 2. Database Migrations
```bash
# Apply migrations to production
supabase db push --db-url "your_production_db_url"
```

### 3. Update Site URL
Update `supabase/config.toml` with your production domain:
```toml
[auth]
site_url = "https://yourdomain.com"
additional_redirect_urls = ["https://yourdomain.com"]
```

## Security Considerations

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use RLS policies** - All tables have security policies
3. **Validate input** - Server actions validate all input data
4. **Rate limiting** - Consider implementing API rate limiting
5. **CORS configuration** - Configure allowed origins in production

## Monitoring and Debugging

### Supabase Dashboard
- Monitor database performance
- View logs and errors
- Manage users and policies
- Database backups

### Local Logs
```bash
# View Supabase logs
supabase logs

# View specific service logs
supabase logs api
supabase logs db
```

## Next Steps

1. Set up your Supabase project
2. Configure environment variables
3. Run the database migration
4. Test the API endpoints
5. Deploy to production

For more information, visit the [Supabase documentation](https://supabase.com/docs).
