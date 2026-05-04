import { test, expect } from "@playwright/test";

const publicPages = [
  { url: "/particuliers", name: "Particuliers" },
  { url: "/professionnels", name: "Professionnels" },
  { url: "/particuliers/magazine", name: "Magazine" },
  { url: "/particuliers/contact", name: "Contact particuliers" },
  { url: "/professionnels/contact", name: "Contact professionnels" },
  { url: "/aide-contact", name: "Aide et contact" },
  { url: "/mentions-legales", name: "Mentions légales" },
  { url: "/conditions-generales-utilisation", name: "CGU" },
  { url: "/politique-de-confidentialite", name: "Politique de confidentialité" },
  { url: "/accessibilite", name: "Accessibilité" },
  { url: "/gestion-des-cookies", name: "Gestion des cookies" },
];

test("Page d'accueil - chargement et titre", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator("h1")).toBeVisible();
});

for (const { url, name } of publicPages) {
  test(`${name} (${url}) - chargement sans erreur`, async ({ page }) => {
    const response = await page.goto(url);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("body")).toBeVisible();
  });
}

test("Page connexion - formulaire visible", async ({ page }) => {
  const response = await page.goto("/connexion");
  expect(response?.status()).toBeLessThan(400);
  const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  await expect(emailInput).toBeVisible();
});
