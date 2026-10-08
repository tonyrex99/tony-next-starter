#!/usr/bin/env node

/**
 * Starter Template Setup Wizard
 *
 * Configures a fresh project cloned from the starter template:
 * - Renames package and updates metadata
 * - Customizes environment variables
 * - Optionally keeps or purges the reference example feature
 * - Optionally re-initializes Git history
 *
 * Usage:
 *   pnpm setup
 *   pnpm setup --help
 *   pnpm setup --name my-app --clean-example --yes
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import readline from "node:readline";

const rootDir = process.cwd();

// Terminal colors
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  red: "\x1b[31m",
};

function log(msg = "") {
  console.log(msg);
}

function success(msg) {
  console.log(`${colors.green}✓${colors.reset} ${msg}`);
}

function info(msg) {
  console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`);
}

function warn(msg) {
  console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
}

// Parse command line flags
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    name: null,
    title: null,
    description: null,
    author: null,
    repo: null,
    cleanExample: null,
    resetGit: null,
    yes: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--yes" || arg === "-y") {
      options.yes = true;
    } else if (arg === "--name" && args[i + 1]) {
      options.name = args[++i];
    } else if (arg === "--title" && args[i + 1]) {
      options.title = args[++i];
    } else if (arg === "--description" && args[i + 1]) {
      options.description = args[++i];
    } else if (arg === "--author" && args[i + 1]) {
      options.author = args[++i];
    } else if (arg === "--repo" && args[i + 1]) {
      options.repo = args[++i];
    } else if (arg === "--clean-example" || arg === "--purge-example") {
      options.cleanExample = true;
    } else if (arg === "--keep-example") {
      options.cleanExample = false;
    } else if (arg === "--reset-git") {
      options.resetGit = true;
    } else if (arg === "--no-reset-git") {
      options.resetGit = false;
    }
  }

  return options;
}

function toTitleCase(str) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

async function askQuestion(rl, question, defaultValue) {
  const prompt = defaultValue
    ? `${colors.bold}${question}${colors.reset} ${colors.dim}(${defaultValue})${colors.reset}: `
    : `${colors.bold}${question}${colors.reset}: `;

  const answer = await new Promise((resolve) => rl.question(prompt, resolve));
  const trimmed = answer.trim();
  return trimmed.length > 0 ? trimmed : defaultValue;
}

async function askYesNo(rl, question, defaultYes = true) {
  const options = defaultYes ? "[Y/n]" : "[y/N]";
  const prompt = `${colors.bold}${question}${colors.reset} ${colors.dim}${options}${colors.reset}: `;

  const answer = await new Promise((resolve) => rl.question(prompt, resolve));
  const trimmed = answer.trim().toLowerCase();
  if (trimmed === "") return defaultYes;
  return trimmed === "y" || trimmed === "yes";
}

function printHelp() {
  log(`
${colors.bold}${colors.cyan}Starter Template Setup Wizard${colors.reset}

${colors.bold}USAGE:${colors.reset}
  pnpm setup [options]

${colors.bold}OPTIONS:${colors.reset}
  --name <string>          Project package name (e.g. 'my-app')
  --title <string>         Display title (e.g. 'My Application')
  --description <string>   Project description
  --author <string>        Author name or GitHub handle
  --repo <string>          Repository URL
  --clean-example          Purge the reference example feature for a clean slate
  --keep-example           Retain the reference example feature (src/features/example)
  --reset-git              Re-initialize Git repository with initial commit
  --no-reset-git           Retain current Git history
  -y, --yes                Accept defaults non-interactively
  -h, --help               Show this help message
`);
}

async function main() {
  const cliOptions = parseArgs();

  if (cliOptions.help) {
    printHelp();
    process.exit(0);
  }

  log(
    `\n${colors.bold}${colors.magenta}====================================================${colors.reset}`
  );
  log(`${colors.bold}${colors.cyan}  🚀 Next.js Starter Template Setup Wizard${colors.reset}`);
  log(`${colors.dim}  Initialize and customize your project in seconds${colors.reset}`);
  log(
    `${colors.bold}${colors.magenta}====================================================${colors.reset}\n`
  );

  // Read current package.json
  const pkgPath = path.join(rootDir, "package.json");
  if (!fs.existsSync(pkgPath)) {
    console.error(
      `${colors.red}Error:${colors.reset} package.json not found in current directory.`
    );
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const defaultProjectName =
    path
      .basename(rootDir)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-") || "my-next-app";

  let projectName = cliOptions.name;
  let projectTitle = cliOptions.title;
  let projectDesc = cliOptions.description;
  let projectAuthor = cliOptions.author;
  let projectRepo = cliOptions.repo;
  let cleanExample = cliOptions.cleanExample;
  let resetGit = cliOptions.resetGit;

  const isInteractive = !cliOptions.yes && process.stdin.isTTY;

  if (isInteractive) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      if (!projectName) {
        projectName = await askQuestion(rl, "1. Project name (kebab-case)", defaultProjectName);
      }
      if (!projectTitle) {
        projectTitle = await askQuestion(rl, "2. Application title", toTitleCase(projectName));
      }
      if (!projectDesc) {
        projectDesc = await askQuestion(
          rl,
          "3. Short description",
          "A scalable Next.js application built with HeroUI and Tailwind CSS"
        );
      }
      if (!projectAuthor) {
        projectAuthor = await askQuestion(rl, "4. Author name or handle", "Tony");
      }
      if (cleanExample === null) {
        const keep = await askYesNo(
          rl,
          "5. Keep the reference example feature (src/features/example)?",
          true
        );
        cleanExample = !keep;
      }
      if (resetGit === null) {
        resetGit = await askYesNo(
          rl,
          "6. Re-initialize Git repository with a fresh commit?",
          false
        );
      }
    } finally {
      rl.close();
    }
  } else {
    // Non-interactive fallback defaults
    projectName = projectName || pkg.name || defaultProjectName;
    projectTitle = projectTitle || toTitleCase(projectName);
    projectDesc = projectDesc || pkg.description || "A scalable Next.js application";
    projectAuthor = projectAuthor || pkg.author || "";
    cleanExample = cleanExample === null ? false : cleanExample;
    resetGit = resetGit === null ? false : resetGit;
  }

  log(`\n${colors.cyan}Applying configuration...${colors.reset}\n`);

  // 1. Update package.json
  pkg.name = projectName;
  pkg.version = "0.1.0";
  pkg.description = projectDesc;
  if (projectAuthor) pkg.author = projectAuthor;
  if (projectRepo) {
    pkg.repository = { type: "git", url: projectRepo };
  } else if (pkg.repository) {
    delete pkg.repository;
  }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
  success(`Updated package.json (name: "${projectName}")`);

  // 2. Setup .env.local if not present
  const envLocalPath = path.join(rootDir, ".env.local");
  const envExamplePath = path.join(rootDir, ".env.example");
  if (!fs.existsSync(envLocalPath) && fs.existsSync(envExamplePath)) {
    let envContent = fs.readFileSync(envExamplePath, "utf-8");
    envContent = envContent.replace(
      /NEXT_PUBLIC_APP_NAME=.*/g,
      `NEXT_PUBLIC_APP_NAME="${projectTitle}"`
    );
    fs.writeFileSync(envLocalPath, envContent, "utf-8");
    success("Created .env.local from .env.example with customized app name");
  } else if (fs.existsSync(envLocalPath)) {
    let envContent = fs.readFileSync(envLocalPath, "utf-8");
    if (envContent.includes("NEXT_PUBLIC_APP_NAME=")) {
      envContent = envContent.replace(
        /NEXT_PUBLIC_APP_NAME=.*/g,
        `NEXT_PUBLIC_APP_NAME="${projectTitle}"`
      );
      fs.writeFileSync(envLocalPath, envContent, "utf-8");
      success("Updated NEXT_PUBLIC_APP_NAME in .env.local");
    }
  }

  // 3. Handle example feature purge if requested
  if (cleanExample) {
    info("Purging reference example feature for a clean project slate...");

    // Remove directories
    const pathsToRemove = [
      path.join(rootDir, "src", "features", "example"),
      path.join(rootDir, "src", "app", "(dashboard)", "example"),
      path.join(rootDir, "src", "app", "api", "items"),
      path.join(rootDir, "tests", "unit", "example-component.test.tsx"),
    ];

    for (const p of pathsToRemove) {
      if (fs.existsSync(p)) {
        fs.rmSync(p, { recursive: true, force: true });
        info(`Removed: ${path.relative(rootDir, p)}`);
      }
    }

    // Clean tests/setup.ts
    const setupTsPath = path.join(rootDir, "tests", "setup.ts");
    if (fs.existsSync(setupTsPath)) {
      const cleanSetupTs = `import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";

// Register feature MSW handlers here as features are created
export const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
`;
      fs.writeFileSync(setupTsPath, cleanSetupTs, "utf-8");
      info("Updated tests/setup.ts to blank MSW handlers");
    }

    // Clean .storybook/mocks/handlers.ts
    const storybookMockPath = path.join(rootDir, ".storybook", "mocks", "handlers.ts");
    if (fs.existsSync(storybookMockPath)) {
      const cleanStorybookMocks = `// Register feature MSW handlers here as features are created
export const handlers = [];
`;
      fs.writeFileSync(storybookMockPath, cleanStorybookMocks, "utf-8");
      info("Updated .storybook/mocks/handlers.ts to blank handlers array");
    }

    // Clean src/config/navigation.ts
    const navPath = path.join(rootDir, "src", "config", "navigation.ts");
    if (fs.existsSync(navPath)) {
      const cleanNav = `export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
}

export const navigationConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "LayoutDashboard",
    },
  ],
  userNav: [
    {
      title: "Profile",
      href: "/settings/profile",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ],
};
`;
      fs.writeFileSync(navPath, cleanNav, "utf-8");
      info("Updated src/config/navigation.ts (removed example route)");
    }

    // Clean src/app/(dashboard)/dashboard/page.tsx
    const dashboardPagePath = path.join(
      rootDir,
      "src",
      "app",
      "(dashboard)",
      "dashboard",
      "page.tsx"
    );
    if (fs.existsSync(dashboardPagePath)) {
      const cleanDashboardPage = `import Link from "next/link";
import { Card, CardHeader } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Boxes, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Dashboard",
  description: "Overview dashboard for ${projectTitle}",
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Application Overview"
        description="Welcome to your Next.js application workspace"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-default-200 bg-content1 shadow-sm">
          <CardHeader className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">Modern Core Stack</p>
              <p className="text-xs text-default-500">Next.js 16 + HeroUI v3 + Tailwind v4</p>
            </div>
          </CardHeader>
          <div className="p-4 pt-0 text-sm text-default-600">
            Pre-configured with React 19, strict TypeScript, RSC boundaries, and theme support out
            of the box.
          </div>
        </Card>

        <Card className="border border-default-200 bg-content1 shadow-sm">
          <CardHeader className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">Contract-First API</p>
              <p className="text-xs text-default-500">Hey API + OpenAPI 3.x</p>
            </div>
          </CardHeader>
          <div className="p-4 pt-0 text-sm text-default-600">
            Zero duplicate DTO typing. Type-safe clients and query wrappers generated directly from
            your OpenAPI contract.
          </div>
        </Card>

        <Card className="border border-default-200 bg-content1 shadow-sm">
          <CardHeader className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">Comprehensive Testing</p>
              <p className="text-xs text-default-500">Vitest + RTL + Storybook + Playwright</p>
            </div>
          </CardHeader>
          <div className="p-4 pt-0 text-sm text-default-600">
            Four tiers of testing: pure logic with Vitest, components with RTL & MSW, UI with
            Storybook, and E2E with Playwright.
          </div>
        </Card>
      </div>

      <Card className="border border-default-200 bg-content1">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Boxes className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Ready to Build Features</h3>
              <p className="text-xs text-default-500">
                Follow the feature development guide in docs/feature-development.md to add domain modules.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
`;
      fs.writeFileSync(dashboardPagePath, cleanDashboardPage, "utf-8");
      info("Updated src/app/(dashboard)/dashboard/page.tsx (removed example feature links)");
    }

    // Clean e2e/example.spec.ts -> smoke test only
    const e2ePath = path.join(rootDir, "e2e", "example.spec.ts");
    if (fs.existsSync(e2ePath)) {
      const cleanE2E = `import { test, expect } from "@playwright/test";

test.describe("Application Smoke Test", () => {
  test("loads login page and navigates to dashboard", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();

    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole("heading", { name: "Application Overview" })).toBeVisible();
  });
});
`;
      fs.writeFileSync(e2ePath, cleanE2E, "utf-8");
      info("Updated e2e/example.spec.ts to core smoke navigation test");
    }

    success("Cleaned reference example feature. Core architecture is ready for your domain.");
  } else {
    success("Kept reference example feature (src/features/example) as a living reference");
  }

  // 4. Update README.md title & header
  const readmePath = path.join(rootDir, "README.md");
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, "utf-8");
    // Replace first header line
    readme = readme.replace(/^# .*/m, `# ${projectTitle}`);
    fs.writeFileSync(readmePath, readme, "utf-8");
    success(`Updated README.md title to "${projectTitle}"`);
  }

  // 5. Handle Git re-initialization if requested
  if (resetGit) {
    info("Resetting Git history...");
    const gitDir = path.join(rootDir, ".git");
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }
    try {
      execSync("git init", { cwd: rootDir, stdio: "ignore" });
      execSync("git add -A", { cwd: rootDir, stdio: "ignore" });
      execSync(`git commit -m "feat: initial commit from starter template"`, {
        cwd: rootDir,
        stdio: "ignore",
      });
      success("Re-initialized fresh Git repository with initial commit");
    } catch (err) {
      warn("Git initialization encountered an issue. You can manually run 'git init'.");
    }
  }

  log(`\n${colors.bold}${colors.green}🎉 Setup completed successfully!${colors.reset}\n`);
  log(`${colors.bold}Next steps to start developing:${colors.reset}`);
  log(
    `  1. ${colors.cyan}pnpm dev${colors.reset}             # Start Next.js development server at http://localhost:3000`
  );
  log(`  2. ${colors.cyan}pnpm test${colors.reset}            # Run Vitest test suites`);
  log(
    `  3. ${colors.cyan}pnpm storybook${colors.reset}       # Launch Storybook at http://localhost:6006`
  );
  log(
    `  4. ${colors.cyan}pnpm verify${colors.reset}          # Run full verification (types, lint, format, test, build)\n`
  );
}

main().catch((err) => {
  console.error(`\n${colors.red}Setup failed:${colors.reset}`, err);
  process.exit(1);
});
