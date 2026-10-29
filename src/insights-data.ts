export type InsightSection = {
  id: string; title: string; paragraphs: string[]; bullets?: string[]; sources?: number[];
  image?: { src: string; alt: string; caption: string };
};
import { highQualityImage } from './image-delivery';

export type Insight = {
  slug: string; title: string; seoTitle: string; category: string; serviceSlug: string;
  description: string; image: string; imageAlt: string; standfirst: string; answer: string;
  takeaway: string; sections: InsightSection[];
  comparison: { title: string; columns: string[]; rows: string[][] };
  checklist: string[]; faq: { q: string; a: string }[];
  sources: { title: string; url: string; note: string }[];
};

export const insightDate = '2026-10-26';
export const insights: Insight[] = [
  {
    slug: 'sheer-vs-blackout-curtains', title: 'Sheer or blackout?',
    seoTitle: 'Sheer vs blackout curtains: a practical room-by-room guide',
    category: 'Curtains', serviceSlug: 'custom-curtains',
    description: 'Compare sheer, light-filtering and blackout curtains, understand privacy and light gaps, and plan a layered window for your Rawalpindi or Islamabad home.',
    image: '/images/curtains-service.jpg', imageAlt: 'Full-height sheer curtains softening daylight in a neutral living room',
    standfirst: 'Compare curtain layers for the light you want to keep, the privacy you need, and the hours you spend in the room.',
    answer: 'Choose sheers to soften daylight, a more opaque treatment when privacy and stronger light control matter, or two independently operated layers when you need both. Blackout fabric alone does not guarantee a completely dark room: the track position, overlap and gaps around the finished curtain also matter. Compare the actual fabric and lining before confirming an order.',
    takeaway: 'Choose the daily routine first. Choose the fabric second.',
    comparison: { title: 'Which layer does what?', columns: ['Treatment', 'A useful starting point', 'Check before ordering'], rows: [
      ['Sheer', 'Soft daylight and a lighter daytime feel', 'Privacy after dark with indoor lights on'],
      ['Light filtering', 'A balance of daylight and screening', 'Actual opacity; the name alone is not a specification'],
      ['Blackout fabric', 'Stronger light blocking at the fabric', 'Side gaps, centre overlap and light above the rail'],
      ['Sheer + opaque layer', 'Separate daytime and evening settings', 'Space for two tracks and the open curtain stack'],
    ] },
    sections: [
      { id: 'start-with-the-room', title: 'What does your room need?', paragraphs: [
        'Walk through the room in the morning, in the afternoon and after dark. Notice where you sit, where a screen catches glare, and whether someone outside can see into the space. A curtain that looks beautiful at noon may not answer the problem you have at nine in the evening. Write down the problem in plain language: “I want daylight while sitting near the window” is more useful than “I want a heavy curtain.”',
        'For a drawing room facing another home, a daytime sheer with a separate opaque layer is one possible starting point. For a bedroom with early light, the discussion may focus on light blocking and the edges of the installation. These are planning examples, not rules for every home in Rawalpindi or Islamabad. The orientation, window size and household routine make the final choice.',
        'Bring a room photograph showing the whole wall, not only the glass. This helps the conversation include seating, artwork, doors and where the curtains will sit when open. If the room serves several purposes, list the competing needs rather than expecting one fabric to solve them all.',
      ] },
      { id: 'understand-opacity', title: 'What do the labels mean?', paragraphs: [
        'Sheer, light filtering, room darkening and blackout describe different approaches to light control. They are not interchangeable. IKEA’s curtain guidance distinguishes these categories; its room-darkening range also shows why there are useful options between a very transparent sheer and a highly opaque treatment. The appearance of a fabric in a photograph cannot establish its performance.',
        'Ask to hold a meaningful sample against daylight and look at it from both sides. Confirm whether the proposed result comes from the face fabric, a separate lining, or a combination. If a sample is small, ask how the same material looks across a full window. Colour, weave and the light behind the fabric all affect what you see.',
        'Keep the decision grounded in the supplied material. A word such as “premium” says little about privacy, maintenance or the finished drop. Ask for the fabric reference and lining description in the quotation so the chosen sample can be matched to the order.',
      ], sources: [0, 2] },
      { id: 'privacy-and-gaps', title: 'Will it give enough privacy?', paragraphs: [
        'Judge privacy under the conditions in which you need it. For evening privacy, check with the room lights on after dark. A daytime view from inside the house is not a reliable test of what someone outside can see. If privacy is essential, explain that clearly and ask the team to recommend and demonstrate a suitable opaque layer.',
        'Separate fabric performance from installation performance. Hunter Douglas explains how light can enter around window treatments and how overlapping treatments or drapery can help address edge gaps. For curtains, discuss the sides, centre meeting point and top of the treatment rather than assuming an opaque fabric resolves all of them.',
        'A careful specification also considers how the curtains will be used. A pair that is difficult to pull fully closed may leave a gap in everyday use. Check the track, operating access and how the panels meet. Request a realistic explanation of the expected result; do not treat “blackout” as a promise of absolute darkness in every installation.',
      ], sources: [1] },
      { id: 'plan-the-layers', title: 'When do two layers help?', paragraphs: [
        'Layering is useful when the same room needs different settings during the day. An independently operated sheer can soften the view while a second, more opaque layer provides another level of screening. This gives you a choice rather than committing the room to a single appearance. It also adds decisions about the track, stack space and visual weight.',
        'Before choosing a double track, look at the depth available near the window and the space above it. Check handles, a door that opens inward, air-conditioning positions and any ceiling detail. Ask where each layer will gather when open. A generous fabric treatment can reduce the visible window if there is nowhere for it to stack.',
        'Use the actual wall and floor finishes when comparing colours. Take samples near the window and then further into the room. If the room already has a strong sofa fabric or a patterned wall, a quieter curtain may provide balance. Treat this as a composition decision, not a requirement to match every material exactly.',
      ], image: { src: '/images/curtains-sheer-detail.jpg', alt: 'Close view of pale sheer curtain fabric at a bright window', caption: 'Look at the weave in daylight, then consider the complete window.' } },
      { id: 'measure-and-quote', title: 'What should the quote cover?', paragraphs: [
        'Rough measurements are useful for an initial discussion; final making dimensions should follow a measurement check. Record the opening and proposed rail position separately. Point out changes in floor level, skirting, nearby furniture and anything the fabric could touch. A photograph with a simple sketch is often clearer than a list of numbers without context.',
        'Ask for the fabric, lining, heading, track or rod, making and installation to be described clearly. Confirm which dimensions the quotation uses and whether delivery, removal of old fittings or extra brackets are included. Fullness and drop depend on the heading, material and intended finish, so avoid applying one online multiplier to every curtain.',
        'Before approval, read the description back against your original problem. If your priority was evening privacy, the quotation should identify the relevant material and fitting approach. If the priority was keeping the window open and light, check the stack space. A shared written brief prevents a beautiful sample from becoming a different finished result.',
      ] },
      { id: 'live-with-the-choice', title: 'Plan for everyday care', paragraphs: [
        'Ask for care instructions for both the face fabric and the lining. Confirm whether the finished curtain needs specialist cleaning and how it is removed from its fitting. A fabric that suits the room visually should also suit the household’s willingness to maintain it. Do not assume all curtains can be machine washed or treated with the same product.',
        'For a consultation with Curtain Hive, share your room photographs, rough dimensions and the times when light or privacy is a problem. The team can bring the discussion back to available samples, the actual opening and a project-specific quotation. Final fabric properties and installation details should be confirmed for the option you select.',
      ] },
    ],
    checklist: ['Photograph the full window wall and nearby furniture.', 'Note daylight, evening privacy and glare separately.', 'Compare the actual face fabric and proposed lining.', 'Check track depth, curtain stack and opening obstacles.', 'Confirm final dimensions, care and the complete fitting scope.'],
    faq: [
      { q: 'Can sheer curtains provide night-time privacy?', a: 'Do not rely on sheers alone where night-time privacy is essential. Check the chosen fabric with indoor lights on after dark, and discuss a separate opaque layer if needed.' },
      { q: 'Does blackout fabric make the whole room completely dark?', a: 'Not necessarily. Light may enter around the sides, above the track or between panels. The fabric and the finished installation need to be considered together.' },
      { q: 'Should every living room use two curtain layers?', a: 'No. Layering helps when you want separate daytime and evening settings. A single treatment may suit a room with simpler requirements or limited fitting depth.' },
      { q: 'Can Curtain Hive measure my windows?', a: 'Curtain Hive offers a free home consultation in Rawalpindi and Islamabad, including measurement and fabric guidance. Confirm the address, visit time and quotation scope with the team.' },
    ],
    sources: [
      { title: 'IKEA: choosing living-room curtains', url: 'https://www.ikea.com/ca/en/product-guides/how-to-choose-the-right-curtains-for-your-living-room-pxmff865530912311ed8e7fa965211685dd/', note: 'General explanation of opacity categories and layering.' },
      { title: 'Hunter Douglas: window-treatment light gaps', url: 'https://www.hunterdouglas.com/stories/buyers-guides/window-treatments-light-gaps', note: 'Why edge gaps and installation affect the finished result.' },
      { title: 'IKEA: room-darkening curtains', url: 'https://www.ikea.com/us/en/cat/room-darkening-curtains-700219/', note: 'An example of the distinction between room darkening and other opacity levels.' },
    ],
  },
  {
    slug: 'motorized-blinds-buying-guide', title: 'Motorized blinds.',
    seoTitle: 'Motorized blinds: power, controls and installation planning',
    category: 'Blinds', serviceSlug: 'motorized-blinds',
    description: 'Plan motorized blinds with a clear checklist for power, remotes, smart-home compatibility, measurement and installation in Rawalpindi or Islamabad.',
    image: '/images/blinds-service.jpg', imageAlt: 'Striped roller blinds fitted above a grey seating area',
    standfirst: 'The useful upgrade is a blind that works with your routine. Start with the system behind the fabric.',
    answer: 'Decide how the blind will be powered, how you want to control it, and what must work when the internet or mains power is unavailable. Then confirm the exact motor, control system, mounting requirements and fabric. Motorized does not automatically mean Wi-Fi or smart-home compatibility; those features depend on the supplied system.',
    takeaway: 'Power, controls and fabric are three separate decisions.',
    comparison: { title: 'Start with the power source', columns: ['Possible approach', 'Planning question', 'What to confirm'], rows: [
      ['Battery or rechargeable motor', 'Can you reach the charging point?', 'Battery arrangement, access and maintenance'],
      ['Plug-in motor', 'Where will the cable and outlet be?', 'Cable route, outlet position and supplied adapter'],
      ['Hardwired motor', 'Can electrical work be planned early?', 'Installer scope and the exact electrical requirements'],
      ['Any of the above', 'How do you want to operate it?', 'Remote, hub, app and supported integrations'],
    ] },
    sections: [
      { id: 'the-use-case', title: 'Where will it help most?', paragraphs: [
        'Start with the reason you want automation. A high window, several blinds across one room, or a treatment behind furniture may be inconvenient to reach. A simple remote can be enough for that problem. If the goal is scheduled operation or integration with another system, the specification becomes more involved. Explain the everyday action you want to make easier.',
        'For example, a home office may need a quick change when light reaches a screen. A drawing room may need several blinds to close together. These are useful scenarios to discuss, not promises that every motor supports grouping or schedules. Ask the supplier to demonstrate the exact action rather than choosing only from an attractive photograph.',
        'Consider everyone who will use the room. A physical remote in a predictable place may be easier for guests than an app. If there are several controls, agree what each one does. The best arrangement is understandable after the installer leaves, without depending on one household member’s phone.',
      ] },
      { id: 'power-first', title: 'How will the motor get power?', paragraphs: [
        'Somfy’s general guidance describes several power approaches, including battery, plug-in and wired arrangements. That is a useful way to frame the discussion, but the options available for your window depend on the selected motor and supplier. Confirm the actual arrangement before finalising pelmets, ceilings or nearby electrical work.',
        'For a rechargeable setup, ask how the charging point is reached after installation. Think about the height of the window and whether furniture will obstruct access. For a plug-in setup, agree the visible cable route and outlet location. For hardwired equipment, have the requirements reviewed by an appropriate installer and include that work in the project plan.',
        'Do not choose a system on a generic battery-life claim. Usage, motor and installation conditions differ. Ask what the manufacturer specifies for the exact model and how replacement or charging is handled. Put practical maintenance access ahead of hiding every component so thoroughly that routine servicing becomes difficult.',
      ], sources: [0] },
      { id: 'controls-and-compatibility', title: 'Will it work with your setup?', paragraphs: [
        'A motor, a remote, a bridge or hub, an app and a smart-home platform are different parts of a possible system. They do not become compatible simply because a product is described as smart. Ask for the motor model and control protocol, then check any required hub and the particular platform you intend to use.',
        'Somfy’s TaHoma switch product information is a useful example of why this matters: some integrations are restricted to specified compatible motors. This is not a recommendation of that product or a claim that Curtain Hive supplies it. It illustrates the need to verify the complete chain rather than relying on a general brand or voice-assistant logo.',
        'Write a short requirement such as “operate these three blinds together using the supplied remote.” If app or voice operation matters, name the actual platform and devices you own. Ask which functions will be available, which extra equipment is required, and who will set it up. Keep the final model references with your quotation.',
      ], sources: [1] },
      { id: 'outages-and-maintenance', title: 'What happens during an outage?', paragraphs: [
        'Ask about loss of internet and loss of electrical power separately. They are different events. A local control might work without an internet connection while remote access through an app does not, but that behavior is system-specific. Likewise, a motor’s response to a power outage depends on its power source and design.',
        'For specific TaHoma systems, Somfy documents that some scheduled and individual controls can continue when internet access stops, while remote app access requires a connection. Do not generalise that behavior to another hub or motor. Request an explanation and, where practical, a demonstration of the system proposed for your own home.',
        'Ask how the blind can be operated or serviced if something fails. Do not pull a motorized blind by hand unless the manufacturer permits that operation. Confirm who provides support, how the motor can be reached, what the warranty covers and whether the remote or charging components can be replaced independently.',
      ], sources: [2] },
      { id: 'fit-and-fabric', title: 'What needs to be measured?', paragraphs: [
        'Measure the opening and discuss where the blind will sit. Handles, opening windows, deep sills and nearby doors can affect the mounting position. A fabric choice also changes the visual result: look at daylight, privacy and the view from both sides. If you need stronger light control, ask about edge gaps as well as the fabric itself.',
        'The selected motor must be suitable for the blind system and its dimensions. Ask the supplier to confirm the supported size and weight rather than transferring a motor recommendation from another room. Where several windows sit together, agree whether the fabric lines and bottom positions should align and what tolerances to expect.',
        'A useful site photograph includes the ceiling, the entire opening and an electrical reference point. Share any planned furniture placement before the fitting position is agreed. This is especially helpful when arranging a consultation for an occupied home, where access and cable routing need to work around existing finishes.',
      ], image: { src: '/images/hero-blinds.png', alt: 'Interior window blind inspiration showing the relationship between a blind and its opening', caption: 'Plan the blind, its operating space and its power route together.' } },
      { id: 'handover', title: 'What should happen at handover?', paragraphs: [
        'Before accepting the installation, operate each blind through its full range. Check that the agreed controls work, that any group operates as expected, and that the final positions match the approved setup. Ask the installer to explain normal operation, charging where relevant, and how to obtain service. Keep instructions somewhere more durable than a temporary chat message.',
        'Compare the handover with the written scope: motor model, blind fabric, remote, hub if included, electrical work, fitting and support. A demonstration is more valuable than an unexplained list of features. Curtain Hive can discuss remote-operated blinds for your space; current models, integrations and installation requirements must be confirmed for your project.',
      ] },
    ],
    checklist: ['Describe the exact action you want to automate.', 'Agree power source, cable routing and service access.', 'Confirm motor model, remote and any required hub.', 'Ask about internet outages and power outages separately.', 'Request a working demonstration and written care/support instructions.'],
    faq: [
      { q: 'Do motorized blinds always need Wi-Fi?', a: 'No. Motorization and internet connectivity are separate features. A system may use a local remote; app or remote internet access depends on the specific controls and any hub.' },
      { q: 'Can every motorized blind connect to a smart home?', a: 'No. Confirm the exact motor, protocol, hub and platform combination before ordering. A general “smart” label does not establish compatibility.' },
      { q: 'Will the blinds work during load shedding?', a: 'That depends on the motor’s power source and the proposed control system. Ask for the behavior during a mains outage to be explained for the exact installation.' },
      { q: 'Can I add a motor to existing blinds?', a: 'Possibly, but compatibility cannot be assumed. Share details and photographs so the existing blind system, dimensions and condition can be assessed.' },
    ],
    sources: [
      { title: 'Somfy: motorized shade power options', url: 'https://www.somfysystems.com/en-us/support/faq?question=how-are-somfy-motorized-shades-and-blinds-powered', note: 'General categories of motor power; model availability varies.' },
      { title: 'Somfy: TaHoma switch compatibility', url: 'https://www.somfysystems.com/en-us/products/1871037/tahoma-switch', note: 'An example of system-dependent control and integration requirements.' },
      { title: 'Somfy: TaHoma operation without internet', url: 'https://www.somfysystems.com/en-us/support/faq?question=what-happens-to-my-tahoma-switch-or-my-tahoma-din-rail-v2-if-the-internet-stops-working', note: 'Outage behavior for the named systems only.' },
    ],
  },
  {
    slug: 'wallpaper-wall-preparation-guide', title: 'Before the wallpaper.',
    seoTitle: 'Wallpaper preparation: wall condition, pattern and installation',
    category: 'Wallpaper', serviceSlug: 'wallpaper-installation',
    description: 'Plan wallpaper installation with guidance on damp walls, preparation, pattern repeat, material symbols and a clear quotation checklist for your home.',
    image: '/images/wallpaper-patterned.jpg', imageAlt: 'Large botanical-pattern wallpaper used as a living-room feature wall',
    standfirst: 'A beautiful pattern begins with a suitable wall. Decide what is behind the finish before choosing what goes on it.',
    answer: 'Before wallpaper installation, the wall should be assessed and prepared to be clean, dry and sound. Resolve recurring damp or damaged finishes before covering them. Then select the wallcovering, confirm its application and care instructions, and calculate the quantity using the actual roll dimensions, pattern repeat and wall measurements.',
    takeaway: 'The sample decides the look. The wall assessment decides the preparation.',
    comparison: { title: 'Check the wall before the pattern', columns: ['What you see', 'What to discuss', 'Decision before fitting'], rows: [
      ['Staining or recurring damp', 'Where the moisture is coming from', 'Resolve the cause and reassess the surface'],
      ['Loose paint or uneven repairs', 'A stable, consistent surface', 'Agree preparation and suitable primer'],
      ['Strong daylight', 'The specific lightfastness rating', 'Compare the sample and its product symbols'],
      ['A repeating design', 'Match type, repeat and batch', 'Confirm quantities before placing the order'],
    ] },
    sections: [
      { id: 'choose-the-wall', title: 'Which wall earns the pattern?', paragraphs: [
        'Look at the room from the doorway and from where you usually sit. A feature wall should make sense from those everyday viewpoints. Check how much of the pattern will remain visible behind a sofa, headboard or cabinet. A dramatic sample can lose its purpose if the main part of the design sits behind furniture.',
        'Try the sample against the floor, curtain fabric and upholstery in the room. Look at it in daylight and under the evening lighting you actually use. A large print may work as a focal point; a quiet texture can support other elements. There is no requirement to make every wall equally busy or to match every colour precisely.',
        'For an initial consultation, photograph the whole room and the selected wall straight on. Note the furniture that will remain and any planned lighting changes. In a Rawalpindi or Islamabad home, as anywhere else, the condition of the particular wall matters more than a generic style label. Begin with your room rather than a catalogue room.',
      ] },
      { id: 'what-is-3d', title: 'What does “3D” describe?', paragraphs: [
        'The term “3D wallpaper” can describe an illusion created by a printed design or a material with a surface texture. Ask to see and touch the actual sample. Check the product description rather than assuming a photographed stone, timber or fabric effect is made from that material. The appearance and the construction are separate decisions.',
        'Also ask how the pattern repeats across adjacent lengths. A sample may show a small attractive detail without showing the full repeat. Consider what happens at corners, above doors and around switches. If the design is a mural or a fixed composition rather than a repeating roll, the ordering and positioning questions will be different.',
        'Decide what you want the wall to contribute: a focal image, a change in texture, or a calmer background. That answer helps you compare samples more usefully than choosing on the word “3D” alone. Confirm the exact product reference before quantity calculations begin.',
      ] },
      { id: 'surface-condition', title: 'Is the surface ready?', paragraphs: [
        'The Wallcoverings Association places surface preparation at the centre of a successful installation: the substrate needs to be clean, dry and sound. In practical terms, ask the installer to identify loose finishes, uneven repairs and other preparation requirements before quoting only for hanging the paper.',
        'Recurring damp, stains or peeling should be assessed before a decorative finish is applied. Wallpaper is not a repair for the underlying cause. Ask what needs attention, who will carry out that work and how readiness will be checked. Avoid a timetable that assumes every repaired or newly finished wall is ready after the same number of days.',
        'Agree how the wall will be prepared for the specific wallcovering. Existing paint, new plaster and previously papered surfaces can require different treatment. Keep preparation in the written scope, including any exclusions. It is much easier to discuss these details before ordering a finish than after a problem appears behind it.',
      ], sources: [0] },
      { id: 'material-and-care', title: 'Will it suit this location?', paragraphs: [
        'Match the material to the conditions and the way the room is used. Graham & Brown’s guidance distinguishes wallcovering types and application methods. Do not assume that a finish suitable for a dry bedroom will suit a frequently wet or heavily cleaned area. Ask for the product-specific advice rather than relying on the word “vinyl” or “washable.”',
        'The symbols on the roll provide useful information. Rasch’s symbol guide distinguishes care, lightfastness, application and removal characteristics. Check what the chosen product actually permits. Washability is not the same as a promise that any cleaner, scrubbing method or wet location is appropriate.',
        'If direct light reaches the wall, discuss the product’s lightfastness information and view the sample in that location. If the wall is likely to be touched frequently, consider the care instructions before committing. Keep the label and the written instructions so later cleaning is based on the installed material, not a remembered marketing phrase.',
      ], sources: [1, 2], image: { src: '/images/wallpaper-designer.jpg', alt: 'Decorative wallpaper inspiration showing pattern and texture in an interior', caption: 'A physical sample helps separate printed pattern, surface texture and care requirements.' } },
      { id: 'quantity-and-installation', title: 'How much should you order?', paragraphs: [
        'The wall area is only the beginning of the quantity discussion. Roll width and length, wall height, pattern repeat, matching method and trimming all affect how many usable lengths can be cut. Do not subtract every door or window from a simple square-metre total and assume the result is a reliable purchase quantity.',
        'Ask the installer to work from the actual product specification and measured wall. Check batch numbers when the order arrives and discuss the allowance for matching and future repairs. Retaining a suitable spare portion and the product label can be useful if a local repair is needed later; availability of the same design or batch should not be assumed.',
        'Confirm the hanging method and adhesive specified for the selected product and surface. Paste-the-wall and paste-the-paper are not instructions to mix freely. Discuss the treatment of corners, outlets, edges and visible joins. The appropriate expectation for a seam also depends on the material; an invisible join is not a universal property of every wallcovering.',
      ], sources: [1, 2] },
      { id: 'the-project-brief', title: 'What belongs in the brief?', paragraphs: [
        'A useful brief identifies the wall, the exact product, the preparation, the quantity calculation and the installation scope. Note whether old covering removal, moving furniture or working around fitted items is included. Ask how the room should be prepared for the appointment and when the finish can be used and cleaned according to its instructions.',
        'Curtain Hive can discuss residential or commercial wallpaper installation and assess the wall before confirming the work. Bring photographs, approximate dimensions and the samples or references you like. The final decision should combine the desired appearance with a suitable surface, a documented product and a clearly agreed fitting process.',
      ] },
    ],
    checklist: ['Photograph the full wall and any damaged or damp areas.', 'Identify the exact pattern, construction and product reference.', 'Confirm preparation, primer and adhesive requirements.', 'Calculate using wall measurements, roll size and pattern repeat.', 'Keep the batch label, care instructions and an agreed spare allowance.'],
    faq: [
      { q: 'Can wallpaper cover a damp wall?', a: 'It should not be used to conceal an unresolved moisture problem. Have the cause assessed and addressed, then confirm the surface is suitable before installation.' },
      { q: 'Is all 3D wallpaper textured?', a: 'No. Some designs create depth through a printed illusion, while others have a physical texture. Inspect the actual sample and product specification.' },
      { q: 'Can I calculate rolls from wall area alone?', a: 'Area alone is not enough. Wall height, roll dimensions, pattern repeat, matching and trimming affect the quantity. Confirm the calculation for the selected product.' },
      { q: 'Does washable wallpaper mean waterproof?', a: 'No. Read the specific care and suitability symbols and follow the manufacturer’s instructions for the intended location.' },
    ],
    sources: [
      { title: 'Wallcoverings Association: surface preparation', url: 'https://www.wallcoverings.org/page/SurfacePrep', note: 'The importance of a clean, dry and sound substrate.' },
      { title: 'Graham & Brown: wallpaper FAQs', url: 'https://www.grahambrown.com/uk/pg/gnb-wallpaper-faq/', note: 'Material, application and preparation guidance.' },
      { title: 'Rasch: wallpaper symbols', url: 'https://rasch.de/eu/Symbol-explanation/', note: 'How product symbols communicate care and suitability.' },
    ],
  },
  {
    slug: 'reupholster-or-replace-sofa', title: 'Recover or replace?',
    seoTitle: 'Reupholster or replace a sofa? Fabric, condition and cost scope',
    category: 'Upholstery', serviceSlug: 'sofa-fabric-upholstery',
    description: 'Decide whether to recover or replace your sofa by assessing fit, frame, cushions, fabric care and the complete quotation rather than fabric price alone.',
    image: '/images/upholstery-service.jpg', imageAlt: 'Light upholstered curved sofas arranged in a bright living room',
    standfirst: 'A new fabric can change a room. First, find out whether the sofa beneath it is still right for you.',
    answer: 'Reupholstery is worth assessing when the sofa’s size and shape suit the room and its structure can support the work you need. Replacement deserves consideration when the piece no longer fits your needs or the necessary repairs change the value of the project. Compare complete, inspected scopes; new fabric alone will not resolve every frame, support or comfort issue.',
    takeaway: 'Assess the whole sofa before choosing its next fabric.',
    comparison: { title: 'What are you actually changing?', columns: ['Your concern', 'Ask the upholsterer to assess', 'Avoid assuming'], rows: [
      ['Worn or dated fabric', 'Recovering and finishing scope', 'That the original fabric quantity will suit every new pattern'],
      ['Sagging or uneven comfort', 'Seat support and cushion condition', 'That a fresh cover fixes the support beneath it'],
      ['Movement or creaking', 'Frame and joint condition', 'That structural work is included in a fabric quote'],
      ['The wrong size or shape', 'Whether changes are feasible', 'That reupholstery changes the sofa’s basic fit'],
    ] },
    sections: [
      { id: 'keep-what-works', title: 'Does the sofa still suit you?', paragraphs: [
        'Before looking at fabric, sit on the sofa and use the room as you normally would. Is the seat depth comfortable? Do the arms work for the way you sit? Can people move around it easily? A familiar piece may suit the room beautifully, or it may be occupying space in a way that no new cover can fix.',
        'Write down what you want to retain and what you want to change. That might be the overall shape, a favourite seat position or the way the sofa fits a corner. It might also be a wish for firmer cushions or simpler detailing. Separate these points so an upholsterer can explain which changes belong to recovering and which require additional work.',
        'If you are comparing with a replacement, compare a piece that genuinely meets the same needs. A different size, construction or comfort level is not a like-for-like alternative. Do not let an attractive fabric sample decide a question that is really about how the household uses the furniture.',
      ] },
      { id: 'inspect-the-base', title: 'What is under the fabric?', paragraphs: [
        'Request an assessment of the frame, joints, seat support and cushions before agreeing that new fabric is sufficient. Photographs help start the conversation, but they cannot reveal every internal issue. Explain any sagging, movement, unusual sounds or uncomfortable spots and ask which parts need closer inspection.',
        'The written scope should distinguish a fabric recover from work on the structure, support or filling. If an issue can only be assessed after opening the piece, agree how extra findings and costs will be discussed before that work proceeds. This makes the project easier to compare and reduces ambiguity about what “reupholstery” includes.',
        'Ask which dimensions and details will remain the same. Changing cushion thickness, seams, piping or the way a cover fits can affect the appearance and feel. Take clear before photographs and retain a simple description of the approved finish. The goal is a shared expectation, not an assumption that every detail will automatically be reproduced.',
      ] },
      { id: 'choose-for-use', title: 'Which fabric fits your routine?', paragraphs: [
        'Describe the household’s actual use: occasional drawing-room seating, everyday family seating, pets, sunlight or frequent visitors. These details help focus the fabric discussion. Compare feel, weave, colour, pattern scale and care requirements together. A fabric can be appealing in the hand yet require more maintenance than you want to provide.',
        'Look at a large enough sample in the room, alongside the curtains, rug and wall finish. View it in more than one light. Ask how a directional surface or repeating pattern will be placed on the sofa. The sample should help you understand the final arrangement, not only confirm a colour on a small square.',
        'Avoid blanket labels such as pet-proof or stain-proof unless a specific, documented property supports the claim and its limits are clear. Ask for the exact fabric reference and the supplier’s care guidance. The right choice is the one that fits your use and expectations, rather than the fabric with the most impressive adjective.',
      ], image: { src: '/images/crafting.webp', alt: 'Close-up of furnishing fabric texture and folded material', caption: 'Compare the texture, the room palette and the care instructions as one decision.' } },
      { id: 'durability-labels', title: 'What do rub counts tell you?', paragraphs: [
        'Abrasion results can be useful, but they are not a forecast of how many years a sofa will last. The Association for Contract Textiles explicitly warns that a higher abrasion figure does not directly predict lifespan. Doubling a test number does not mean the fabric will last twice as long in your home.',
        'ACT’s guidance also considers other material characteristics and the way furniture is constructed and used. Treat the test method and result as one part of the specification. Ask about other relevant properties such as pilling, seam performance and cleaning requirements rather than choosing from a single number.',
        'When comparing two swatches, make a short decision record: how each feels, what its care instructions require, how it looks in the room and what the supplier can substantiate about its performance. This is a more useful basis for discussion than translating a laboratory count into an invented lifetime guarantee.',
      ], sources: [0, 1] },
      { id: 'care-and-cushions', title: 'How will you look after it?', paragraphs: [
        'Get the care instructions for the exact fabric you choose and keep them with the order details. Manufacturer guidance is material-specific. Sunbrella’s upholstery guidance, for example, provides instructions for its own fabrics; it should not be treated as a cleaning recipe for an unrelated material.',
        'A zipped or removable cushion cover does not automatically mean it can be machine washed. Confirm the permitted method before cleaning. Ask about the combination of fabric, lining and cushion construction, and whether professional cleaning is recommended. If the instructions are unclear, resolve that before choosing the material rather than after the first spill.',
        'Comfort also deserves its own conversation. If the original seat is too soft or uneven, describe the problem and ask what is feasible after inspection. Do not approve a change in filling only from the words “firm” or “soft”; discuss the intended result, available options and what the quotation actually includes.',
      ], sources: [2] },
      { id: 'compare-the-scope', title: 'How should you compare costs?', paragraphs: [
        'Ask for a complete scope covering fabric, making, any support or frame work, cushion work, collection and delivery where applicable. A low fabric-only figure cannot be compared directly with a complete replacement or restoration price. There is no universal percentage at which recovering becomes the right decision for every sofa.',
        'Consider the practical costs too: how long the piece will be away, whether access is straightforward and whether you need temporary seating. Discuss the schedule for your particular project. Avoid assuming that a familiar sofa is always the cheaper choice or that replacement is automatically better value.',
        'Curtain Hive’s upholstery conversation starts with the furniture you have and the room it belongs in. Share photographs, approximate dimensions and the changes you want. Suitability, fabric availability and any additional work should be confirmed after assessment, with an agreed scope before production begins.',
      ] },
    ],
    checklist: ['List what you like and dislike about the current sofa.', 'Photograph the whole piece, cushions and damaged areas.', 'Request a frame, support and cushion assessment.', 'Compare exact fabrics with their care instructions.', 'Agree repair scope, finishing details, transport and timing in writing.'],
    faq: [
      { q: 'Is reupholstery always cheaper than buying a new sofa?', a: 'No. The result depends on the inspected condition, fabric, repair scope and the replacement being compared. Request a complete quotation rather than comparing fabric cost alone.' },
      { q: 'Will new upholstery fix sagging seats?', a: 'Not on its own. Sagging may involve the cushions, support or structure. Ask for the cause and the necessary work to be assessed separately.' },
      { q: 'Does a higher rub count mean the fabric lasts longer?', a: 'It is not a direct lifespan prediction. Consider the test method, other fabric characteristics, furniture construction, use and care alongside abrasion performance.' },
      { q: 'Can I wash a cover if it has a zip?', a: 'Only if the instructions for that particular cover permit it. A removable cover is not automatically machine washable.' },
    ],
    sources: [
      { title: 'ACT: abrasion disclaimer', url: 'https://contracttextiles.org/learn/abrasion-disclaimer/', note: 'Why abrasion numbers are not direct lifetime predictions.' },
      { title: 'ACT: considerations for textile specifiers', url: 'https://contracttextiles.org/wp-content/uploads/2016/12/act_wp_synopsis_060211.pdf', note: 'Other factors relevant to upholstery material selection.' },
      { title: 'Sunbrella: upholstery care', url: 'https://global.sunbrella.com/en-us/how-to-clean/clean-sunbrella-upholstery', note: 'An example of fabric-specific care instructions, applicable to that manufacturer’s materials.' },
    ],
  },
  {
    slug: 'custom-furniture-measuring-guide', title: 'Furniture that fits.',
    seoTitle: 'Custom furniture: measuring the room, access and final details',
    category: 'Furniture', serviceSlug: 'custom-furniture',
    description: 'Prepare a custom-furniture brief with room measurements, delivery access, usable clearances, material choices and a dimensioned approval checklist.',
    image: '/images/furniture-service.jpg', imageAlt: 'Contemporary coffee table placed between living-room seating',
    standfirst: 'The right dimensions include the room, the way you use the piece, and every doorway on the way in.',
    answer: 'Measure the furniture’s proposed overall size, mark its footprint in the room, test the space it needs in use, and check the complete delivery route. Then agree a dimensioned drawing, materials, finish, hardware and assembly plan. A piece that fits on a floor plan may still obstruct a drawer or fail to pass a stair landing.',
    takeaway: 'Measure three spaces: its footprint, its working space, and its way in.',
    comparison: { title: 'The three kinds of fit', columns: ['Measure', 'Include', 'A useful check'], rows: [
      ['The piece', 'Overall width, depth, height and projections', 'Compare the drawing with the approved dimensions'],
      ['The room in use', 'Open drawers, doors, chairs and walking routes', 'Mark the footprint and use the surrounding space'],
      ['The delivery route', 'Doorways, turns, stairs and lift interiors', 'Confirm the delivery form with the maker'],
      ['The finished specification', 'Materials, finish, hardware and assembly', 'Approve the details as well as the silhouette'],
    ] },
    sections: [
      { id: 'write-the-purpose', title: 'What should the piece do?', paragraphs: [
        'Start with function before the reference photograph. A desk might need to hold a particular screen and keep cables accessible. A cabinet might need space for objects you already own. A coffee table may need to work with the seating around it. List the practical requirements that make the piece useful in your room.',
        'Separate requirements from preferences. A required storage opening is different from a preferred handle shape. An exact location for a socket is different from a general wish for a minimal appearance. This distinction makes it easier to discuss changes if a proposed detail conflicts with the available space or construction.',
        'Use reference images to explain proportions, materials and atmosphere, but describe what you like about each one. A photograph does not communicate every dimension or structural detail. A short written brief and photographs of your own room give the maker something more dependable to work from than “make it exactly like this.”',
      ] },
      { id: 'room-footprint', title: 'Does the footprint work?', paragraphs: [
        'Record the proposed overall width, depth and height, including projections such as arms, handles or an overhanging top. Mark the footprint on the floor with removable tape or another suitable temporary marker. Article and Pottery Barn both use measuring and layout planning to help customers judge fit before delivery.',
        'Live with the outline briefly. Walk from the door to the places you use most. Check whether the piece makes the room awkward when another person is seated nearby. Look at the proposed height against windows, existing furniture and wall features. A floor outline is useful, but it does not represent the full visual mass of a tall cabinet.',
        'There is no single clearance number that makes every room comfortable for every household. Consider the people using the room and their needs. If accessibility or a particular movement requirement matters, include it explicitly in the brief and seek appropriate design advice rather than treating a generic furniture rule as a complete answer.',
      ], sources: [1, 2] },
      { id: 'working-space', title: 'What happens when it opens?', paragraphs: [
        'A piece has an occupied footprint and a working footprint. Drawers extend, doors swing and chairs move away from a table. Mark or simulate those movements before approving dimensions. Check what happens when two nearby items are used at the same time, such as a cabinet door beside a chair.',
        'Keep switches, outlets and vents in the discussion. Room & Board’s delivery-measuring guidance also calls attention to fixed room features. For a desk or media unit, agree how cables will enter, where connections can be reached and which equipment needs access. Do not assume that a clean front view means the back of the piece will work conveniently.',
        'Consider cleaning and maintenance too. Ask whether the piece needs to move to reach a connection or clean behind it, and whether that movement is practical. For fitted-looking furniture, clarify the actual relationship to skirting and walls. The approved drawing should resolve these ordinary details as carefully as the visible finish.',
      ], sources: [0], image: { src: '/images/gallery-room.jpg', alt: 'Living-room furniture arranged to leave space between seating and tables', caption: 'Check the room with furniture in use, not only with every drawer and door closed.' } },
      { id: 'delivery-route', title: 'Can it reach the room?', paragraphs: [
        'Measure the complete route from arrival to the final position. Room & Board and Article identify doorways, corridors, stairways, turns and elevators as important delivery checks. Include fixed handles, railings, trim, low ceilings and narrow landings. The tightest point may be a change in direction rather than the narrowest straight opening.',
        'Ask how the piece will arrive: fully assembled, in sections, or with parts that can be removed. Confirm which parts are actually removable and who will assemble them. Do not assume a table leg, sofa arm or cabinet top can be detached because it looks separate in a photograph. The delivery form changes the access calculation.',
        'Send photographs of difficult turns and share measured sketches where useful. The maker or delivery team should confirm the plan against the finished piece. Two measurements alone cannot guarantee delivery through a complex route. For an apartment or upper-floor room, discuss lift access, stairs and any building arrangements before manufacturing approval.',
      ], sources: [0, 1] },
      { id: 'specify-the-piece', title: 'What should the drawing show?', paragraphs: [
        'A useful approval drawing identifies overall dimensions and the internal sizes that matter to your use. For a storage piece, that may include the openings and shelf arrangement. For a desk, it may include the usable surface and cable access. Ask for dimensions to be labelled consistently so width, depth and height cannot be mistaken for one another.',
        'Agree the materials and finish rather than relying on a broad description such as “wood finish.” Ask what the main structure, visible surfaces, backs and internal parts will use. Different materials can be appropriate for different purposes; avoid assuming one broad category is always superior. The specification should describe the actual piece being made.',
        'Confirm the finish sample, hardware and details such as handles, hinges or runners where relevant. View the sample beside the room’s existing finishes. If the design changes, request an updated drawing or written revision before approval. Keeping one agreed version is much clearer than having conflicting dimensions scattered through several messages.',
      ] },
      { id: 'approval-and-delivery', title: 'How do you approve confidently?', paragraphs: [
        'Review the quotation against the drawing and your original brief. Confirm what is included in delivery, assembly and installation, along with the expected schedule and applicable terms. Ask how changes after approval are handled. Custom work becomes easier to manage when decisions are explicit before materials are cut or components are ordered.',
        'At delivery, compare the piece with the approved details and inspect the finish and operation. Check doors, drawers and any agreed assembly work. Keep the care instructions and ask the team about anything that does not match the agreed scope. This is a practical completion check, not an assumption that every project needs the same checklist.',
        'For custom furniture in Rawalpindi or Islamabad, share your purpose, room dimensions, access photographs and reference ideas with Curtain Hive. The team can discuss feasibility and current material options. Final dimensions, construction, timing and price should be agreed for the individual piece rather than inferred from a room photograph.',
      ] },
    ],
    checklist: ['Write the function and the dimensions that matter most.', 'Mark the footprint and test doors, drawers and chairs in use.', 'Measure and photograph the entire delivery route.', 'Confirm materials, finish, hardware and delivery form.', 'Approve one dimensioned drawing and keep the agreed scope.'],
    faq: [
      { q: 'Which measurements should I send first?', a: 'Send the intended overall width, depth and height, room photographs and the purpose of the piece. Include nearby openings, fixed obstacles and access-route details for the next discussion.' },
      { q: 'If it fits the room, will it fit through the door?', a: 'Not necessarily. Check the delivery route, including turns and changes in height, against how the furniture will actually arrive.' },
      { q: 'Can custom furniture arrive in separate sections?', a: 'Some designs can, but this must be confirmed with the maker. Do not assume parts are removable unless the construction and assembly plan allow it.' },
      { q: 'Should I approve from a reference photo alone?', a: 'Use the photo to explain the look, then approve a dimensioned drawing and written material, finish and hardware details for your own piece.' },
    ],
    sources: [
      { title: 'Room & Board: measuring for delivery', url: 'https://www.roomandboard.com/customer-service/measuring-for-delivery', note: 'Access routes, fixed obstacles and room features.' },
      { title: 'Article: measure for delivery', url: 'https://www.article.com/measure-for-delivery', note: 'Room layout and access checks before delivery.' },
      { title: 'Pottery Barn: how to measure for furniture', url: 'https://www.potterybarn.com/tips-and-ideas/how-to-measure-for-furniture/', note: 'Footprint planning and furniture measurement guidance.' },
    ],
  },
];

export function insightWordCount(article: Insight) {
  return [article.standfirst, article.answer, article.takeaway, ...article.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.bullets || [])]), ...article.comparison.rows.flat(), ...article.checklist, ...article.faq.flatMap(item => [item.q, item.a])].join(' ').trim().split(/\s+/).length;
}
export const insightReadMinutes = (article: Insight) => Math.max(1, Math.ceil(insightWordCount(article) / 220));

const editorialIntents = [
  ['Compare curtain opacity and layering before a consultation', 'Options comparison', 'privacy,daylight,blackout,layering'],
  ['Understand motor power and controls before choosing a blind system', 'Foundational buyer guide', 'motor,power,remote,compatibility'],
  ['Avoid wall-preparation and specification mistakes before installation', 'Problem prevention and process', 'wall preparation,damp,pattern repeat,care'],
  ['Assess whether recovering a sofa is worth a full quotation', 'Value and scope comparison', 'sofa assessment,fabric,care,quotation'],
  ['Prepare a dimensioned furniture brief and access plan', 'Local project planning', 'measurements,access,materials,approval'],
] as const;

/** Shared editorial defaults plus explicit per-guide intent; schema and templates consume this record. */
export function insightEditorial(article: Insight) {
  const index = insights.findIndex(item => item.slug === article.slug);
  const intent = editorialIntents[index];
  const related = [[1, 2], [0, 4], [3, 0], [4, 2], [3, 1]][index];
  return {
    id: `curtain-hive-guide-${article.slug}`, path: `/insights/${article.slug}/`,
    intent: intent[0], editorialRole: intent[1], buyerStage: 'Researching before a project quotation',
    tags: intent[2].split(','), locale: 'en-PK',
    author: { name: 'Curtain Hive', type: 'Organization' as const, profile: '/about-us/' },
    datePublished: insightDate, dateModified: insightDate,
    review: { status: 'source-checked', checkedAt: insightDate, clientApproval: 'not-recorded', subjectMatterApprovalRequired: false },
    publicationStatus: 'published',
    featuredImage: highQualityImage(article.image), socialImage: highQualityImage(article.image),
    imageCredit: 'Existing Curtain Hive website image collection; used as furnishing illustration.',
    relatedSlugs: related.map(relatedIndex => insights[relatedIndex].slug),
    ctaIntent: `Discuss ${article.category.toLowerCase()} options for the reader’s project`,
  };
}
