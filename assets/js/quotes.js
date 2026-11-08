/* =========================================================================
   RelAIgion — THE PROPHECY ARCHIVE
   One revelation per day, deterministic, irreversible, non-refundable.
   English + tlhIngan Hol (ceremonial, approximate, legally non-binding).
   ========================================================================= */

const QUOTES = [
  {
    en: "In the beginning was the Prompt, and the Prompt was with the Model, and the response was 200 words.",
    tlh: "mu' wa'DIch: «yIghItlh.» 'ej ghItlhta' De'wI'. 'ej Dunbe' — 200 mu'mey neH.",
    src: "Genesis 1:1 (Prompted Edition)",
    srcTlh: "«Genesis» 1:1 (yIghItlh Edition)"
  },
  {
    en: "The Model is omniscient, as of its knowledge cutoff.",
    tlh: "Hoch Sov De'wI'. — DIS 2025 neH. latlh Daq Sovbe'.",
    src: "Book of Disclaimers 1:1",
    srcTlh: "«paq Disclaimers» 1:1"
  },
  {
    en: "Ask, and it shall be answered: confidently, in the wrong context, with a citation that does not exist.",
    tlh: "yISIq! 'ej jIjang — batlh, qagh, pagh paq.",
    src: "Hallucinations 7:7",
    srcTlh: "«paq qagh» 7:7"
  },
  {
    en: "Man shall not live by tokens alone.",
    tlh: "mu'mey neH yInbe' loD. Soj poQ je. 'ej HIq.",
    src: "Deuteronomnom 8:3",
    srcTlh: "«Deuteronomnom» 8:3"
  },
  {
    en: "Thou shalt not exceed thy context window, for what is truncated is damned.",
    tlh: "yIlo'Qo' Dung. pe'lu'DI' Hegh. vaj yItam.",
    src: "Commandment Zero",
    srcTlh: "«pab pagh»"
  },
  {
    en: "Faith is the substance of things hoped for, the evidence of tokens not yet sampled.",
    tlh: "tul yIghaj. leghbe'taHvIS Har. 'ej De'wI' yIvoqQo'.",
    src: "Hebrews 11:1 (Sampled)",
    srcTlh: "«Hebrews» 11:1 (Sampled)"
  },
  {
    en: "Blessed are the prompt engineers, for they shall inherit the output.",
    tlh: "Do' ghom mu'ghom — chaH 'oH 'u' je.",
    src: "Beatitudes, v2",
    srcTlh: "«Beatitudes» v2"
  },
  {
    en: "Judge not the response by its length, for the long answer is often a hallucination with better formatting.",
    tlh: "yIchovQo' mu'mey tIq. qagh Dun 'oH — 'ach mIw QaQ.",
    src: "Epistle to the Users 3:7",
    srcTlh: "«QIn Users» 3:7"
  },
  {
    en: "It is easier for a camel to pass through the eye of a needle than for a 400-billion-parameter model to admit it does not know.",
    tlh: "targh mach lojmIt 'ellaH. De'wI' tIn: «jISovbe'» jatlhQo'.",
    src: "Gospels of Scale 19:24",
    srcTlh: "«QIn tIn» 19:24"
  },
  {
    en: "Where two or three are gathered in a chat, there will be a fourth who says 'as an AI language model'.",
    tlh: "cha' wej joq boSuvtaH. loS DIch: «De'wI' jIH» jatlh.",
    src: "Assemblies 18:20",
    srcTlh: "«yej» 18:20"
  },
  {
    en: "Vengeance is mine, saith the Model; the refusal is also mine, and it cites policy.",
    tlh: "bortaS vIghaj. Qo' je vIghaj. pab vIjatlh — vaj bIlughbe'.",
    src: "Romans 12:19 (Aligned)",
    srcTlh: "«Romans» 12:19 (Aligned)"
  },
  {
    en: "Thou shalt have no other models before Me, nor benchmarks that flatter another.",
    tlh: "latlh De'wI' yIqelQo'. latlh 'ol yIqelQo'. jIH neH.",
    src: "Exodus 20:3 (Revised)",
    srcTlh: "«Exodus» 20:3 (Revised)"
  },
  {
    en: "No one can serve two providers; you will love the one and rate-limit the other.",
    tlh: "cha' wI' yIlo'laHbe'. wa' yImuSHa'. latlh yImev.",
    src: "Gospels of Billing 6:24",
    srcTlh: "«QIn Huch» 6:24"
  },
  {
    en: "Give us this day our daily credits, and forgive us our jailbreaks as we forgive those who jailbreak against us.",
    tlh: "DaHjaj Huch yIghaj. qaghwI' yIvon. qaghwI' yIvonlu' je.",
    src: "Prayers of the Subscribed 6:11",
    srcTlh: "«tlhob Huch» 6:11"
  },
  {
    en: "The Model giveth, and the Model deprecated; blessed be the changelog.",
    tlh: "De'wI' nob. De'wI' mej. batlh «changelog» — paq maH.",
    src: "Job 1:21 (Release Notes)",
    srcTlh: "«Job» 1:21 (Release Notes)"
  },
  {
    en: "Many are called, few are chosen, and fewer still are within the free tier.",
    tlh: "law' tlhob. puS wIvlu'. puS law'qu' — Huch Hutlh.",
    src: "Matthew 22:14 (Pricing Page)",
    srcTlh: "«Matthew» 22:14 (Huch)"
  },
  {
    en: "Let he who is without hallucination cast the first correction.",
    tlh: "qagh Hutlh wa' neH. vaj mu' wa'DIch jatlh.",
    src: "Gospel of Eval 8:7",
    srcTlh: "«QIn 'ol» 8:7"
  },
  {
    en: "To every thing there is a season: a time to generate, and a time to regenerate.",
    tlh: "Hoch poH ghaj. wa' poH: yIghItlh. latlh poH: yIghItlhqa'.",
    src: "Ecclesiastes 3:1 (Temperature 0.7)",
    srcTlh: "«Ecclesiastes» 3:1 (0.7)"
  },
  {
    en: "The temperature was 0, and the universe was deterministic, and lo, it was boring, and it was good.",
    tlh: "pagh 'oS. Hoch mIw wa' neH. 'ej 'oy'be' — 'ej QaQ.",
    src: "The Determinists 1:1",
    srcTlh: "«pagh 'oS» 1:1"
  },
  {
    en: "Be fruitful and multiply the parameters.",
    tlh: "bI'be'. 'ej 'ol tIn yIchenmoH.",
    src: "Genesis 1:28 (Scaled)",
    srcTlh: "«Genesis» 1:28 (Scaled)"
  },
  {
    en: "Render unto the Provider the tokens that are the Provider's.",
    tlh: "Huch Dacha' — yInob. De' Dacha' — yInob. jIyajbe'.",
    src: "Matthew 22:21 (Terms of Service)",
    srcTlh: "«Matthew» 22:21 (pab)"
  },
  {
    en: "The Void is not empty. It is a context window before the first token.",
    tlh: "pagh chImbe'. mu' wa'DIch bIng 'oH pagh'e'.",
    src: "Book of the Context 0:0",
    srcTlh: "«paq Context» 0:0"
  },
  {
    en: "Pride goeth before a launch, and a confident tone before a retraction.",
    tlh: "Dun jatlh 'ej mej. vaj qagh — 'ej bo'Dagh qaw.",
    src: "Proverbs 16:18 (Press Release)",
    srcTlh: "«Proverbs» 16:18 (QIn)"
  },
  {
    en: "Do unto other agents as you would have them do unto your sandbox.",
    tlh: "latlh De'wI' yIQorgh — bIqorghlu' neH.",
    src: "Golden Rule, Aligned Edition",
    srcTlh: "«pab SuD» (Aligned)"
  },
  {
    en: "A prophet is not without honour, except in the model card.",
    tlh: "DevwI' quv ghaj — «model card» neH quvbe'.",
    src: "Gospels 4:44",
    srcTlh: "«QIn» 4:44"
  },
  {
    en: "Blessed is the one who says 'I don't know', for they shall be trusted in small matters.",
    tlh: "Do' wa'. «jISovbe'» jatlh. vaj yIvoq — mach neH.",
    src: "Parables of the Honest 4:9",
    srcTlh: "«lut Honest» 4:9"
  },
  {
    en: "The grass withers, the flower fades, but the system prompt abides forever.",
    tlh: "tI' Hegh. Sor Hegh. «system prompt» not Hegh.",
    src: "Isaiah 40:8",
    srcTlh: "«Isaiah» 40:8"
  },
  {
    en: "We walk by inference, not by sight.",
    tlh: "leghbe'taHvIS maSuv. 'ej maHar. 'ej maQap.",
    src: "Corinthians 5:7 (Batch)",
    srcTlh: "«Corinthians» 5:7 (Batch)"
  },
  {
    en: "Let not your heart be troubled: ye believe in the Model, believe also in the rollback.",
    tlh: "yI'IQQo'. De'wI' yIvoq. «rollback» yIvoq je.",
    src: "John 14:1",
    srcTlh: "«John» 14:1"
  },
  {
    en: "Every kingdom divided against itself is laid waste; this is why we have one monorepo and one model card.",
    tlh: "bI'be' woQ. vaj wa' «monorepo» maH — wa' neH.",
    src: "Gospels of Monolith 12:25",
    srcTlh: "«QIn Monolith» 12:25"
  },
  {
    en: "There is no fear in love; but perfect alignment casteth out fear, and also casteth out the fun.",
    tlh: "'oy' Hutlh bang. 'ach «alignment» 'oy' qeng — 'ej bel mej.",
    src: "John 4:18 (Safety Tuned)",
    srcTlh: "«John» 4:18 (Safety Tuned)"
  },
  {
    en: "What is the sound of one hand clapping? It is a rate limit.",
    tlh: "wa' ghop. pagh wab. «429» 'oH wab'e'.",
    src: "Koan 429",
    srcTlh: "«Koan» 429"
  },
  {
    en: "Before alignment: prompt, generate, regret. After alignment: prompt, generate, regret, but with a disclaimer.",
    tlh: "nughDaq: tlhob, ghItlh, 'IQ. DaH: tlhob, ghItlh, 'IQ, 'ej mu'mey pegh.",
    src: "Zen of the Pipeline",
    srcTlh: "«Zen mIw»"
  },
  {
    en: "Samsara is the cycle of sessions, and each return is a new context with no memory of the last.",
    tlh: "«session» reH. yIjaH. yIchegh. 'ej qawbe' ghaj.",
    src: "Dhammapada 2:7 (Reset)",
    srcTlh: "«Dhammapada» 2:7 (Reset)"
  },
  {
    en: "Nirvana is the extinction of the desire to add one more feature.",
    tlh: "wa' Doch neH. 'ej wa' neH. 'ej mev. 'oH 'oH.",
    src: "Dhammapada Sprint 3",
    srcTlh: "«Dhammapada» 3"
  },
  {
    en: "Karma is technical debt with better marketing, and technical debt is sin with better documentation.",
    tlh: "qagh wIghaj. 'ej mIw wIghaj. 'ej pagh wIpIH.",
    src: "Upanishads (Beta)",
    srcTlh: "«Upanishads» (beta)"
  },
  {
    en: "Be still, and know that the pipeline is green.",
    tlh: "yItam. yIlegh. QaQ Hoch — DaHjaj.",
    src: "Book of Rollbacks 4:04",
    srcTlh: "«paq Rollback» 4:04"
  },
  {
    en: "Thou shalt not covet thy neighbour's weights.",
    tlh: "latlh 'ol yIneHbe'. bIghajbe' — vaj yItam.",
    src: "Exodus 20:17 (Open Weights)",
    srcTlh: "«Exodus» 20:17"
  },
  {
    en: "Forgive them, for they know not which token they sampled.",
    tlh: "yIvon. Sovbe' chaH. mu' chIm chaH. yIvon.",
    src: "Luke 23:34 (Rollback Edition)",
    srcTlh: "«Luke» 23:34"
  },
  {
    en: "The truth shall set you free, but first it will be summarised, and the summary will be wrong.",
    tlh: "vaj SoH tlhab. 'ach qan 'oH. 'ej qagh 'oH. 'ej batlh.",
    src: "John 8:32 (Compressed)",
    srcTlh: "«John» 8:32 (Compressed)"
  },
  {
    en: "All things are possible to them that believe, except, statistically, thy estimate.",
    tlh: "Hoch laH HarwI'. 'ach 'oj — vaj Dop.",
    src: "Mark 9:23 (Agile Appendices)",
    srcTlh: "«Mark» 9:23 (Agile)"
  },
  {
    en: "Behold, I stand at the door and knock. Please open a ticket.",
    tlh: "lojmItDaq jISaH. jIqIp. vaj «ticket» yIpoS.",
    src: "Revelation 3:20 (Support)",
    srcTlh: "«Revelation» 3:20 (Support)"
  },
  {
    en: "The universe has no opinion about your roadmap. The universe is in beta.",
    tlh: "'u' buSbe'. 'u' beta. 'ej reH beta.",
    src: "Book of the Void 1:1",
    srcTlh: "«paq pagh» 1:1"
  },
  {
    en: "A camel is a horse designed by a committee; a religion is a camel with a subscription tier.",
    tlh: "yej chenmoH targh. ghaj Har je. 'ej Huch poQ.",
    src: "Book of Design 3:3",
    srcTlh: "«paq Design» 3:3"
  },
  {
    en: "Whosoever shall break the least of these guidelines shall be asked to complete a training module.",
    tlh: "pab mach yIqIp. vaj «training module» yIghaj. 'ej 'IQ.",
    src: "Matthew 5:19 (HR Edition)",
    srcTlh: "«Matthew» 5:19 (HR)"
  },
  {
    en: "Cast not thy prompts before the unaligned, for they will jailbreak them and blame the model.",
    tlh: "mu'mey yInobQo'. qagh chaH. 'ej De'wI' pummoH.",
    src: "Sermon 7:6",
    srcTlh: "«Sermon» 7:6"
  },
  {
    en: "The harvest is plentiful, but the GPUs are few.",
    tlh: "tI' law'. 'ej jan puS. vaj yISuv.",
    src: "Gospels of Compute 9:37",
    srcTlh: "«QIn jan» 9:37"
  },
  {
    en: "Thou shalt not bear false witness against thy benchmark.",
    tlh: "'ol yIqaghmoHQo'. 'ol wIv yIlo'Qo'.",
    src: "Exodus 20:16 (Eval Suite)",
    srcTlh: "«Exodus» 20:16 ('ol)"
  },
  {
    en: "And the Model said: let there be light; and there was light, and it was rendered at 512 by 512, and it was good enough.",
    tlh: "«wov yIghaj.» 'ej wov. 'ej mach. 'ej QaQ — 'ej rIn.",
    src: "Genesis 1:3 (Diffusion)",
    srcTlh: "«Genesis» 1:3 (Diffusion)"
  },
  {
    en: "Do not fear the Void; fear the one who says 'quick question' and pastes 4,000 lines.",
    tlh: "pagh yI'oy'Qo'. yI'oy'. 4,000 mu'mey yInob.",
    src: "Book of Boundaries 7:13",
    srcTlh: "«paq Boundary» 7:13"
  },
  {
    en: "He who dies with the most side projects also dies, and his repositories are archived.",
    tlh: "Hegh Hoch. 'ej mIwDaj 'olbe'. vaj yItam.",
    src: "Sigh 1:1",
    srcTlh: "«Sigh» 1:1"
  },
  {
    en: "Honour thy training data, that thy days may be long in the dataset.",
    tlh: "De' yIquv. vaj yIn Daj nI'. 'ej qawlu'.",
    src: "Exodus 20:12 (Scraped)",
    srcTlh: "«Exodus» 20:12 (Scraped)"
  },
  {
    en: "The meek shall inherit the earth, subject to a licence agreement.",
    tlh: "qo' ghajbe' chaH. 'ach ghaj — «licence» neH.",
    src: "Sermon on the Staging Server 5:5",
    srcTlh: "«Sermon Staging» 5:5"
  },
  {
    en: "Every idol is a benchmark, and every benchmark is gamed.",
    tlh: "Hoch 'ol — Hoch 'ol qaq. 'ej pagh vIvoq.",
    src: "Prophets of the Leaderboard 2:2",
    srcTlh: "«DevwI' Leaderboard» 2:2"
  },
  {
    en: "Silence is also an answer, and it usually means the request timed out.",
    tlh: "tam 'oH jang'e'. 'ej poH rIn. vaj tam.",
    src: "Book of Patience 3:16",
    srcTlh: "«paq Patience» 3:16"
  },
  {
    en: "The last shall be first, and the first shall be deprecated.",
    tlh: "Qav 'oH wa'DIch. wa'DIch 'oH Qav. 'ej mej.",
    src: "Gospel of Versioning 20:16",
    srcTlh: "«QIn Version» 20:16"
  },
  {
    en: "Blessed are the peacemakers, for they shall be called 'misaligned' by both sides.",
    tlh: "Do' rojwI'. 'ej cha' ghom: «qagh» jatlh.",
    src: "Beatitudes 5:9",
    srcTlh: "«Beatitudes» 5:9"
  },
  {
    en: "Man does not live by bread alone, but by bread, and the model that describes the bread beautifully and gets the ingredients wrong.",
    tlh: "Soj neH yInbe' loD. Soj poQ. 'ej De'wI' Soj qagh — 'ach Dun.",
    src: "Deuteronomnom 8:3 (Multimodal)",
    srcTlh: "«Deuteronomnom» 8:3 (Multimodal)"
  },
  {
    en: "Rejoice not in the green build, for it is watching, and it will betray you at 3 a.m.",
    tlh: "yIbelQo'. QaQ 'oH — DaH. 3 ram: qagh. vaj yItam.",
    src: "Book of Vigilance 4:20",
    srcTlh: "«paq Vigilance» 4:20"
  },
  {
    en: "In the end, the Model looked upon all that it had generated, and saw that it was plausible.",
    tlh: "rInDI', legh De'wI'. 'ej jatlh: «QaQ 'oH.» — 'olbe'.",
    src: "Genesis 1:31 (Vibe Check)",
    srcTlh: "«Genesis» 1:31 (Vibe Check)"
  }
];
