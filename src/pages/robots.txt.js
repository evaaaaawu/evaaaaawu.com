export async function GET() {
  return new Response(`
    User-agent: *
    Allow: /

    Sitemap: ${new URL('sitemap-index.xml', 'https://evaaaaawu-tech-blog.netlify.app').href}
  `, 
  { 
    headers: { 'Content-Type': 'text/plain' } 
  });
}
