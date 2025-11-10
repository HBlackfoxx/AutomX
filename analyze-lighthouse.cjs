const fs = require('fs');

const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));

console.log('═══════════════════════════════════════');
console.log('      LIGHTHOUSE AUDIT RESULTS');
console.log('═══════════════════════════════════════\n');

// Scores
console.log('📊 OVERALL SCORES:\n');
Object.entries(report.categories).forEach(([key, cat]) => {
  const score = Math.round(cat.score * 100);
  const emoji = score >= 90 ? '✅' : score >= 50 ? '⚠️' : '❌';
  console.log(`${emoji} ${cat.title}: ${score}/100`);
});

// Key Metrics
console.log('\n⏱️  CORE WEB VITALS:\n');
const audits = report.audits;
console.log('FCP (First Contentful Paint):', audits['first-contentful-paint'].displayValue);
console.log('LCP (Largest Contentful Paint):', audits['largest-contentful-paint'].displayValue);
console.log('TBT (Total Blocking Time):', audits['total-blocking-time'].displayValue);
console.log('CLS (Cumulative Layout Shift):', audits['cumulative-layout-shift'].displayValue);
console.log('Speed Index:', audits['speed-index'].displayValue);

// Opportunities
console.log('\n🚀 TOP PERFORMANCE OPPORTUNITIES:\n');
const opportunities = [
  'render-blocking-resources',
  'unused-css-rules',
  'unused-javascript',
  'modern-image-formats',
  'offscreen-images',
  'unminified-css',
  'unminified-javascript',
  'uses-text-compression',
  'uses-responsive-images'
];

opportunities.forEach(id => {
  const audit = audits[id];
  if (audit && audit.score !== null && audit.score < 1 && audit.details) {
    console.log(`❌ ${audit.title}`);
    if (audit.displayValue) {
      console.log(`   Potential savings: ${audit.displayValue}`);
    }
    console.log(`   Score: ${Math.round(audit.score * 100)}/100\n`);
  }
});

// Diagnostics
console.log('\n🔍 KEY DIAGNOSTICS:\n');
const diagnostics = [
  'total-byte-weight',
  'dom-size',
  'bootup-time',
  'mainthread-work-breakdown'
];

diagnostics.forEach(id => {
  const audit = audits[id];
  if (audit && audit.displayValue) {
    const emoji = audit.score >= 0.9 ? '✅' : audit.score >= 0.5 ? '⚠️' : '❌';
    console.log(`${emoji} ${audit.title}: ${audit.displayValue}`);
  }
});

// Accessibility issues
console.log('\n♿ ACCESSIBILITY:\n');
if (report.categories.accessibility.score === 1) {
  console.log('✅ Perfect score! No issues found.');
} else {
  const a11yAudits = Object.values(audits).filter(
    a => a.score !== null && a.score < 1 && a.details && a.details.type === 'table'
  );
  a11yAudits.forEach(audit => {
    console.log(`❌ ${audit.title}`);
  });
}

// SEO
console.log('\n🔍 SEO:\n');
if (report.categories.seo.score === 1) {
  console.log('✅ Perfect score! All SEO checks passed.');
} else {
  const seoIssues = Object.values(audits).filter(
    a => a.group === 'seo-content' && a.score !== null && a.score < 1
  );
  seoIssues.forEach(audit => {
    console.log(`❌ ${audit.title}`);
  });
}

console.log('\n═══════════════════════════════════════\n');
