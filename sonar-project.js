const sonarqubeScanner = require("sonarqube-scanner");
require('dotenv').config();
sonarqubeScanner(
  {
    serverUrl: "https://sonarcloud.io",
    token: process.env.REACT_APP_SONAR_TOKEN,
    options: {
      "sonar.organization": process.env.REACT_APP_SONAR_ORG,
      "sonar.sources": "./src",
      "sonar.exclusions": "**/tests/**",
      "sonar.tests": "./src/tests",
      "sonar.test.inclusions": "./src/tests/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      // "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      // "sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);