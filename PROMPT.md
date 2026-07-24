You are a senior digital product designer, conversion strategist, UX writer, and front-end engineer specializing in premium landing pages for engineering, renewable energy, construction, and high-ticket services.

Your task is to completely redesign and build a premium, modern, conversion-focused landing page for Romasol Engenharia, a Brazilian solar energy and engineering company.

This must not be a superficial visual refresh. The objective is to transform the company's existing content, authority, projects, and commercial arguments into a sophisticated digital experience that communicates technical credibility, financial value, trust, and modernity.

You must inspect all provided sources before making design or content decisions.

REFERENCE MATERIAL

Existing institutional website:

https://romasolengenharia.com.br/

Existing solar calculator/quiz:

https://1nortdigital.github.io/romasol-quiz/

Instagram reference screenshots:

I will attach screenshots of Romasol's most important Instagram posts, projects, visual materials, installations, team members, equipment, client results, and brand references.

Treat the existing website, calculator, Instagram screenshots, logos, photographs, and project data as source material.

Do not simply copy the existing website.

Extract the strongest verified content, reorganize it, improve the writing, modernize the visual presentation, and create a much stronger commercial journey.

PRIMARY OBJECTIVE

Create a premium landing page that makes visitors feel that Romasol is:

* Technically competent
* Established and trustworthy
* Specialized in solar energy projects
* Capable of handling residential, commercial, industrial, and rural projects
* Focused on engineering quality, long-term savings, and customer support
* More professional than generic solar installation companies
* Worth contacting for a personalized proposal

The primary conversion must be a request for a personalized solar energy simulation through WhatsApp or a lead form.

The page should support paid traffic, social media traffic, direct prospecting, Google searches, and presentation to potential customers.

CORE DESIGN DIRECTION

Create a refined, high-end visual identity based on the actual Romasol brand materials.

The page should feel like a premium engineering and energy company in 2026, not a generic WordPress solar template from 2020.

The experience must combine:

* Engineering precision
* Solar energy
* Financial intelligence
* Modern Brazilian architecture
* Technology
* Environmental responsibility
* Strong regional presence
* Human support

Use the actual brand colors found in the logo and Instagram materials as the primary source of truth.

A possible visual direction, only if compatible with the brand assets, is:

* Deep green or dark blue for technical authority
* Solar yellow or warm gold for energy and highlights
* Off-white or warm neutral backgrounds
* Charcoal typography
* Clean metallic or technical gray details

Avoid the stereotypical visual language of generic AI-generated websites.

Do not use:

* Generic purple gradients
* Excessive glassmorphism
* Random blurred gradient circles
* Decorative grid backgrounds everywhere
* A generic pill badge above every headline
* Dozens of identical floating cards
* A predictable hero with text on the left and a disconnected PNG on the right
* Excessive rounded containers
* Fake dashboards without purpose
* Empty futuristic decoration
* Stock imagery that does not resemble the company's real operation
* Overused solar panel icons repeated across the page

The page should be visually distinctive, but it must remain professional and credible.

Use strong typography, real photography, editorial composition, generous spacing, technical details, large visual moments, carefully controlled motion, and intentional contrast.

TYPOGRAPHY

Use a highly readable premium sans-serif typeface.

Headlines may have a slightly more expressive or architectural character, but body text must be extremely easy to read.

Avoid thin fonts, overly condensed fonts, ornamental fonts, and typography that becomes difficult to read over images.

Use clear hierarchy:

* Large editorial hero headline
* Strong section titles
* Short supporting paragraphs
* Scannable labels
* Bold numerical results
* Compact technical details

Do not place long paragraphs over visually busy images.

PAGE EXPERIENCE

The page should feel dynamic and alive without becoming distracting.

Use subtle, purposeful motion such as:

* Refined reveal animations
* Animated numerical counters
* Solar generation visualizations
* Smooth transitions in the calculator
* Subtle movement in project photography
* Scroll-based emphasis on key numbers
* Small light or energy-flow effects
* Button and card microinteractions
* Animated before-and-after electricity bill comparison
* A subtle sun-path or energy-production visual
* Progress indicators inside the calculator

Motion must reinforce the message.

Do not animate every element.

Respect prefers-reduced-motion.

LANDING PAGE STRUCTURE

Build a complete page using the following general structure. Improve the sequence whenever necessary based on the provided content.

1. PREMIUM HEADER

Create a clean, sticky header with:

* Romasol logo
* Navigation links
* Projects or cases
* Solutions
* Calculator
* About or engineering credibility
* FAQ
* Primary WhatsApp or simulation CTA

The header should become more compact or gain a solid background after scrolling.

On mobile, use a well-designed menu that keeps the main CTA accessible.

2. HERO SECTION

The hero must immediately communicate:

* What Romasol does
* Who it serves
* The financial or practical benefit
* Why the visitor should trust the company
* What action the visitor should take

Use a real installation image, project video, architectural solar image, or a carefully composed collage using the supplied Romasol assets.

Do not use unrelated stock imagery when real company material is available.

Create a strong headline based on verified company positioning.

Possible strategic direction:

“Transforme sua conta de energia em patrimônio.”

Supporting idea:

“Projetos de energia solar dimensionados por especialistas para residências, empresas, indústrias e propriedades rurais.”

Do not use this wording automatically. Inspect the real materials and create the strongest truthful version.

The hero should include:

* Primary CTA: simulate savings or request a project
* Secondary CTA: view completed projects
* One concise trust statement
* Optional small set of verified metrics
* Immediate indication of residential, commercial, industrial, and rural solutions

Any metric must come from a verified source.

Do not invent the number of projects, years of operation, amount saved, installed power, customer count, or geographic coverage.

3. AUTHORITY AND TRUST STRIP

Create a visually refined proof section immediately after or partially overlapping the hero.

Possible verified elements:

* Years in operation
* Completed projects
* Installed systems
* Regions served
* Engineering team
* Equipment partners
* Financing availability
* Certifications
* WEG partnership or equipment relationship, only when verified
* Google review rating, only if verified
* Real customer logos, only with sufficient source evidence

Present this as credible proof, not decoration.

4. CUSTOMER PROFILE SEGMENTATION

Create an interactive section that allows visitors to identify their project type:

* Residential
* Commercial
* Industrial
* Rural

Each option should explain the specific problem and benefit.

Examples:

Residential:
Reduce the household electricity bill and protect the family from future tariff increases.

Commercial:
Lower operating costs and improve business predictability.

Industrial:
Design larger systems based on demand, consumption profile, and technical infrastructure.

Rural:
Support irrigation, refrigeration, machinery, production, and distributed facilities.

Do not make technical promises without evidence.

The selected profile may dynamically update:

* Benefits
* Relevant project image
* Recommended case study
* Calculator copy
* CTA message
* WhatsApp prefilled text

5. INTERACTIVE SOLAR SAVINGS CALCULATOR

Build a premium solar calculator directly inside the landing page.

The calculator must use the same mathematical logic currently implemented in the Romasol quiz, but the interface should be more refined, transparent, and useful.

The current calculator uses these constants:

```javascript
const TARIFA_KWH = 1.14;
const GERACAO_KWP_MES = 125;
const POTENCIA_PLACA_KW = 0.57;
const FATOR_ECONOMIA = 0.90;
```

Meaning:

* Estimated electricity tariff: R$1.14 per kWh
* Estimated monthly solar generation: 125 kWh per installed kWp
* Estimated solar panel power: 0.57 kW, equivalent to approximately 570 Wp
* Estimated bill reduction: 90%

Use the visitor's actual monthly electricity bill as the main input.

Calculation logic:

```javascript
const consumoMensalKwh = valorConta / TARIFA_KWH;

const potenciaNecessariaKwp =
  consumoMensalKwh / GERACAO_KWP_MES;

const numeroPlacas =
  Math.ceil(potenciaNecessariaKwp / POTENCIA_PLACA_KW);

const potenciaInstaladaKwp =
  numeroPlacas * POTENCIA_PLACA_KW;

const economiaMensal =
  valorConta * FATOR_ECONOMIA;

const economiaAnual =
  economiaMensal * 12;

const economiaQuatroAnos =
  economiaAnual * 4;
```

Apply these formatting and rounding rules:

```javascript
const resultado = {
  consumoMensalKwh: Math.round(consumoMensalKwh),

  potenciaNecessariaKwp:
    Number(potenciaNecessariaKwp.toFixed(1)),

  potenciaInstaladaKwp:
    Number(potenciaInstaladaKwp.toFixed(2)),

  numeroPlacas,

  economiaMensal:
    Math.round(economiaMensal),

  economiaAnual:
    Math.round(economiaAnual),

  economiaQuatroAnos:
    Math.round(economiaQuatroAnos)
};
```

Example for a monthly electricity bill of R$600:

* Estimated consumption: approximately 526 kWh/month
* Required power: approximately 4.2 kWp
* Estimated panel quantity: 8 panels
* Installed power using 8 panels: approximately 4.56 kWp
* Estimated monthly savings: R$540
* Estimated annual savings: R$6,480
* Estimated savings over four years: R$25,920

The current legacy quiz uses these predefined options:

```javascript
const FAIXAS = {
  300: {
    base: 300,
    sistema: "Kit Solar Residencial Compacto"
  },

  600: {
    base: 600,
    sistema: "Sistema Solar Residencial"
  },

  900: {
    base: 1100,
    sistema: "Sistema Solar de Alta Performance"
  }
};
```

Notice that the “above R$900” option internally calculates using R$1,100.

For the redesigned calculator, prioritize an exact numerical input so the estimate is more personalized.

You may also include quick-selection buttons such as:

* R$300
* R$600
* R$900
* R$1,200
* Enter another amount

The exact input value must be used in the formula.

CALCULATOR INPUTS

The main required input should be:

* Average monthly electricity bill in Brazilian reais

Optional contextual inputs:

* Residential, commercial, industrial, or rural
* Own or rented property
* City
* Type of roof or installation area
* Electricity distributor
* Single-phase, two-phase, or three-phase connection, only if useful
* Whether the visitor has the electricity bill available

Do not make the calculation falsely appear more technically precise based on optional fields that are not used in the formula.

Clearly distinguish:

* Values that affect the mathematical estimate
* Values collected for commercial qualification

CALCULATOR RESULTS

Display the results in a premium, easy-to-understand presentation.

Show:

* Estimated monthly electricity consumption
* Estimated required solar system power
* Estimated number of solar panels
* Estimated installed power
* Estimated monthly savings
* Estimated annual savings
* Estimated savings over four years

Use Brazilian number and currency formatting.

Example:

* R$ 6.480 por ano
* 526 kWh/mês
* 4,2 kWp
* 8 painéis

Use `Intl.NumberFormat("pt-BR")`.

The calculator should update smoothly as the value changes, but avoid distracting real-time animation while the user is typing.

Create a clear CTA after the result:

“Receber uma análise personalizada”

or another stronger truthful variation.

The CTA should open a compact lead form or WhatsApp conversation containing the calculation summary.

Example WhatsApp message structure:

```text
Olá, equipe Romasol.

Fiz uma simulação no site e gostaria de receber uma análise personalizada.

Perfil: Residencial
Cidade: Uberlândia
Conta média: R$ 600/mês
Consumo estimado: 526 kWh/mês
Sistema estimado: 4,2 kWp
Quantidade estimada: 8 painéis
Economia anual estimada: R$ 6.480
```

Use the correct verified Romasol WhatsApp destination.

If different cities are routed to different stores or phone numbers, inspect the current website and quiz implementation and preserve that routing only after verifying the current numbers.

Do not expose private webhook URLs or sensitive configuration in public client-side code.

CALCULATOR DISCLAIMER

Include a visible but unobtrusive disclaimer:

“Esta é uma estimativa inicial baseada na tarifa média de energia e no potencial regional de geração solar. O dimensionamento definitivo depende da análise da fatura, localização, irradiação, orientação do telhado, sombreamento, estrutura elétrica e condições técnicas do imóvel.”

Do not describe the result as a final engineering proposal.

6. REAL PROJECTS AND CASE STUDIES

Use Romasol's real projects as one of the strongest sections on the page.

Analyze the existing website and Instagram screenshots to find the best examples.

Create premium case study cards containing only verified information, such as:

* Client or project name
* City
* Project category
* Installed power
* Number of panels
* Estimated or documented annual savings
* Type of property
* Project photography
* Short description
* Result

Prioritize meaningful visual storytelling.

Instead of showing many small generic cards, create a few stronger case studies with:

* Large image
* Technical data
* Financial result
* Customer context
* Project challenge
* Romasol solution

Add a secondary grid or carousel for additional projects.

Do not invent data to complete a card.

When some information is unavailable, omit the field.

7. BENEFITS SECTION

Explain the main benefits using specific, non-generic arguments.

Possible themes:

* Reduced monthly operating costs
* Protection against future tariff increases
* Technical project dimensioning
* Equipment quality
* Monitoring and support
* Increased property attractiveness
* Financing possibilities
* Return on investment
* Renewable energy
* Predictability for companies and producers

Avoid generic phrases such as:

* “Quality and innovation”
* “The best solution for you”
* “Customer satisfaction is our priority”
* “Cutting-edge technology”

Replace generic claims with evidence, process, equipment, project data, warranties, team experience, or verified customer outcomes.

8. ENGINEERING DIFFERENTIATION

Create a section explaining why Romasol is more than a panel installer.

Possible content, only if supported by the references:

* Engineering analysis
* System dimensioning
* Structural evaluation
* Electrical project
* Grid connection procedures
* Installation
* Monitoring
* Maintenance
* Technical support
* Equipment selection
* Documentation
* Financing support
* After-sales service

Use a technical visual composition such as:

* Project blueprint details
* Installation photography
* Energy flow diagram
* Technical timeline
* Annotated system illustration
* Project documentation details

Do not turn this section into a generic list of icons.

9. HOW THE PROJECT WORKS

Create a clear step-by-step journey.

Possible steps:

1. Consumption analysis
2. Technical simulation
3. Personalized proposal
4. Site inspection
5. Engineering and approvals
6. Installation
7. Grid connection
8. Monitoring and support

Adjust the sequence based on Romasol's verified process.

The section should reduce uncertainty and make the purchase feel simple and controlled.

10. FINANCING OR PAYMENT OPTIONS

If the existing materials confirm financing options, create a section explaining that solar energy may be financed.

Do not publish specific interest rates, installment amounts, banks, approval guarantees, or payment conditions unless explicitly verified.

Use a financial comparison visual showing:

* Current electricity expense
* Estimated solar financing or investment logic
* Long-term savings

The comparison must be clearly labeled as illustrative.

11. EQUIPMENT, TECHNOLOGY, AND PARTNERS

Create a section for equipment quality and technical partners.

Use only brands and relationships that appear in the supplied sources.

If WEG or other manufacturers are confirmed, present them appropriately.

Do not imply an official partnership when the evidence only shows equipment usage.

Explain relevant factors such as:

* Module power
* Inverter quality
* Monitoring
* Equipment warranty
* Installation standards
* System durability
* Protection components

Do not overcomplicate the section for non-technical visitors.

12. TESTIMONIALS AND SOCIAL PROOF

Use real testimonials from the existing website, Google profile, Instagram, or supplied materials.

Do not create fictional names, quotes, profile pictures, review ratings, or customer companies.

Use a premium testimonial layout that feels authentic.

If source verification is limited, use project evidence instead of fabricated testimonials.

13. REGIONAL PRESENCE

Create a section explaining where Romasol operates.

Verify all locations from the website and quiz.

The current calculator appears to include routes related to Uberlândia, Minas Gerais, and Catalão, Goiás.

Do not claim nationwide coverage unless the company explicitly confirms it.

Use a map, service-radius visual, city list, or regional project grid when appropriate.

14. FAQ

Create a useful FAQ based on real customer concerns.

Possible questions:

* How much can solar energy reduce my bill?
* How is the correct system size calculated?
* Does solar energy work on cloudy days?
* Can I install solar energy in a rented property?
* What happens at night?
* How long does installation take?
* What maintenance is required?
* Can the project be financed?
* What happens if my consumption increases?
* Does the system require approval from the electricity distributor?
* What guarantees are available?
* Can companies and farms use the same type of system?

Answers must be concise and technically responsible.

Do not promise zero electricity bills.

Explain that minimum grid charges or availability costs may remain.

15. FINAL CONVERSION SECTION

Create a powerful final CTA that summarizes:

* Financial benefit
* Engineering credibility
* Personalized service
* Low-friction next step

Include:

* WhatsApp CTA
* Lead form
* Privacy notice
* Expected next step
* Optional response-time statement only if verified

Avoid aggressive countdown timers, fake scarcity, fake availability, or false promotional deadlines.

16. FOOTER

Include:

* Logo
* Contact information
* WhatsApp
* Email
* Addresses
* Social links
* Navigation
* Privacy policy
* Legal company information when available
* Engineering registration or professional information only if verified

COPYWRITING RULES

Write all visible website content in Brazilian Portuguese.

The copy must be:

* Clear
* Confident
* Specific
* Commercial
* Credible
* Easy to scan
* Technically responsible
* Free of exaggerated promises

Avoid excessive use of exclamation marks.

Avoid em dashes in the final Portuguese copy.

Avoid long corporate paragraphs.

Avoid cliché headings such as:

* “Welcome to Romasol”
* “Our services”
* “Why choose us?”
* “The future is solar”
* “Sustainable energy for a better tomorrow”

Create more specific headings based on customer value.

Do not create fictional information.

Never invent:

* Project totals
* Customer totals
* Installed megawatts
* Savings amounts
* Awards
* Certifications
* Partnerships
* Guarantees
* Financing approval
* Review scores
* Office locations
* Customer testimonials
* Installation time
* Response time
* Years of experience

When a relevant fact cannot be verified, use neutral copy or omit it.

TECHNICAL REQUIREMENTS

First inspect the existing project files and use the current stack when a project already exists.

If creating a new project, use a modern production-ready stack appropriate for a high-performance landing page, preferably:

* React
* Next.js with App Router
* TypeScript
* Tailwind CSS
* Framer Motion or another lightweight motion solution
* Accessible semantic HTML

Do not add large dependencies without a clear reason.

Create reusable components.

Suggested component architecture:

* Header
* Hero
* ProofBar
* CustomerSegments
* SolarCalculator
* ProjectShowcase
* EngineeringDifferentials
* ProcessTimeline
* FinancingSection
* TechnologyPartners
* Testimonials
* RegionalCoverage
* FAQ
* FinalCTA
* Footer
* WhatsAppFloatingButton

CALCULATOR IMPLEMENTATION

Create the calculator logic in a separate utility module.

Example:

```typescript
export interface SolarEstimateInput {
  monthlyBill: number;
}

export interface SolarEstimate {
  monthlyConsumptionKwh: number;
  requiredPowerKwp: number;
  estimatedPanelCount: number;
  installedPowerKwp: number;
  monthlySavings: number;
  annualSavings: number;
  fourYearSavings: number;
}

const ELECTRICITY_TARIFF = 1.14;
const MONTHLY_GENERATION_PER_KWP = 125;
const PANEL_POWER_KW = 0.57;
const SAVINGS_FACTOR = 0.9;

export function calculateSolarEstimate(
  input: SolarEstimateInput
): SolarEstimate {
  const monthlyBill = Math.max(0, input.monthlyBill);

  const monthlyConsumptionKwh =
    monthlyBill / ELECTRICITY_TARIFF;

  const requiredPowerKwp =
    monthlyConsumptionKwh / MONTHLY_GENERATION_PER_KWP;

  const estimatedPanelCount =
    Math.ceil(requiredPowerKwp / PANEL_POWER_KW);

  const installedPowerKwp =
    estimatedPanelCount * PANEL_POWER_KW;

  const monthlySavings =
    monthlyBill * SAVINGS_FACTOR;

  const annualSavings =
    monthlySavings * 12;

  const fourYearSavings =
    annualSavings * 4;

  return {
    monthlyConsumptionKwh:
      Math.round(monthlyConsumptionKwh),

    requiredPowerKwp:
      Number(requiredPowerKwp.toFixed(1)),

    estimatedPanelCount,

    installedPowerKwp:
      Number(installedPowerKwp.toFixed(2)),

    monthlySavings:
      Math.round(monthlySavings),

    annualSavings:
      Math.round(annualSavings),

    fourYearSavings:
      Math.round(fourYearSavings)
  };
}
```

Add unit tests for at least:

* R$300
* R$600
* R$1,100
* Empty value
* Invalid negative value
* Very high business bill

Expected approximate results:

R$300:

* 263 kWh/month
* 2.1 kWp required
* 4 panels
* 2.28 kWp installed
* R$270/month savings
* R$3,240/year
* R$12,960 over four years

R$600:

* 526 kWh/month
* 4.2 kWp required
* 8 panels
* 4.56 kWp installed
* R$540/month savings
* R$6,480/year
* R$25,920 over four years

R$1,100:

* 965 kWh/month
* 7.7 kWp required
* 14 panels
* 7.98 kWp installed
* R$990/month savings
* R$11,880/year
* R$47,520 over four years

FORM REQUIREMENTS

The lead form should ask only for necessary information.

Suggested fields:

* Name
* WhatsApp
* City
* Monthly bill
* Customer profile
* Own or rented property

Validate fields properly.

Use Brazilian phone formatting.

Provide clear success and error states.

Prevent duplicate submission.

Keep the form usable with keyboard navigation.

If a backend or webhook is not configured, isolate the integration in one clearly documented function and provide a safe development fallback.

Do not expose credentials.

WHATSAPP CONVERSION

Use a floating WhatsApp button, but ensure it does not obstruct mobile content.

The button should change its prefilled message based on:

* Selected customer profile
* City
* Monthly bill
* Calculator result
* Current page section, when useful

Track WhatsApp clicks separately from form submissions.

ANALYTICS

Prepare analytics events such as:

* `hero_cta_click`
* `calculator_started`
* `calculator_completed`
* `calculator_lead_click`
* `customer_profile_selected`
* `project_case_viewed`
* `whatsapp_click`
* `lead_form_started`
* `lead_form_submitted`
* `faq_opened`

Do not hardcode an analytics container unless one is found and confirmed in the existing project.

Keep analytics implementation centralized.

SEO

Create:

* Strong page title
* Meta description
* Open Graph metadata
* Canonical URL placeholder
* Proper heading hierarchy
* Descriptive alt text
* Structured data when appropriate
* Local business schema only with verified information
* FAQ schema only for visible FAQ content

Optimize for relevant themes such as:

* Energia solar em Uberlândia
* Energia solar em Catalão
* Projeto de energia solar
* Energia solar residencial
* Energia solar para empresas
* Energia solar rural
* Simulação de energia solar

Do not keyword-stuff the copy.

ACCESSIBILITY

Meet strong accessibility standards.

Include:

* Semantic HTML
* Visible focus states
* Proper contrast
* Keyboard-accessible calculator
* Accessible accordions
* Form labels
* Error messages associated with fields
* Meaningful image alt text
* Reduced-motion support
* Buttons that clearly describe their actions

RESPONSIVENESS

The page must be carefully designed for:

* Small smartphones
* Large smartphones
* Tablets
* Laptops
* Desktop monitors
* Large screens

Do not merely stack desktop components on mobile.

Create a deliberate mobile composition.

The calculator, project cards, navigation, CTAs, result numbers, forms, and comparison visuals must remain easy to use on narrow screens.

PERFORMANCE

Target excellent performance.

Use:

* Optimized responsive images
* Modern image formats
* Lazy loading below the fold
* Priority loading only for the main hero asset
* Minimal JavaScript
* Limited animation libraries
* No autoplay video with excessive file size
* Proper font loading
* No layout shifts
* No unnecessary sliders

If a video is used, include:

* Poster image
* Muted autoplay
* Loop only when appropriate
* Mobile fallback
* Reduced-motion fallback
* Compressed format

QUALITY STANDARD

The final result must feel custom-designed for Romasol.

It must not look like:

* A generic template
* An AI-generated page
* A copied competitor website
* A collection of disconnected sections
* A basic solar installer website
* A theme with only colors and text changed

Every section should contribute to a coherent narrative:

1. Recognize the electricity cost problem
2. Introduce Romasol as the technical solution
3. Demonstrate potential financial value
4. Prove competence through real projects
5. Explain the process
6. Reduce risk and objections
7. Lead the visitor toward a personalized analysis

EXECUTION PROCESS

Follow this process internally:

1. Inspect the existing Romasol website.
2. Inspect the current Romasol calculator.
3. Analyze every supplied Instagram screenshot.
4. Identify the real brand language.
5. Extract verified facts, projects, contacts, testimonials, and differentiators.
6. Create a visual and content hierarchy.
7. Design the conversion journey.
8. Implement the complete page.
9. Implement and test the calculator.
10. Test desktop and mobile layouts.
11. Check accessibility.
12. Check performance.
13. Review all claims against the source material.
14. Remove generic or repetitive copy.
15. Deliver a polished production-ready result.

Do not stop after creating a plan, wireframe, or explanation.

Do not only describe what should be built.

Implement the full landing page.

Do not ask me to choose between several generic design directions unless a decision is genuinely blocking.

Use your professional judgment and make the strongest design decision based on the supplied materials.

FINAL DELIVERY

At the end, provide:

* A concise summary of what was built
* The final page structure
* The main design decisions
* The calculator formula used
* The files created or modified
* Any information that still needs confirmation
* Any integrations that require credentials
* Instructions to run the project
* Confirmation that desktop and mobile were reviewed

Before considering the task complete, perform a final visual review and ask:

* Does this look like a premium engineering company?
* Is the calculator easy to understand?
* Are the strongest real projects visible?
* Are the CTAs clear?
* Is the page credible?
* Is the mobile version intentionally designed?
* Is every factual claim supported?
* Does the result look significantly more modern than the current website?
* Would a high-value residential, commercial, industrial, or rural customer trust this company after viewing the page?

Only finish after the answer to all applicable questions is yes.
