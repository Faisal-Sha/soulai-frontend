const fs = require('fs');
const t = (id, label, intro, items, desc) => ({ id, label, intro, items: items.map(l => ({ label: l })), description: desc });
const r = (arch, tabs) => ({ title: 'Самопроявление', intro: 'Эта энергия  ваша сила, ваш дар. Душе комфортно выражать её, и жить через эту энергию получается естественно.', archetype: arch, tabs });
