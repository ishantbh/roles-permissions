/**
 * Generates a URL-safe organization slug with a random suffix.
 *
 * Example:
 * "Acme Inc." -> "acme-inc-k8f3xq"
 */
export function generateOrganizationSlug(name: string): string {
  const baseSlug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with -
    .replace(/^-+|-+$/g, '') // Remove leading/trailing -
    .replace(/-{2,}/g, '-') // Collapse multiple -

  const suffix = crypto.randomUUID().slice(0, 6)

  return `${baseSlug || 'workspace'}-${suffix}`
}
