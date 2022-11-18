const getQuestionMock = () => {
  return [
    {
      question: 'The Harvard architecture for micro-controllers added which additional bus?',
      choices: ['Address', 'Data', 'Instruction', 'Control'],
      answer: 3
    },
    {
      question:
        'The common software-programming acronym &quot;I18N&quot; comes from the term &quot;Interlocalization&quot;.',
      choices: ['True', 'False'],
      answer: 3
    },
    {
      question: 'What does CPU stand for?',
      choices: ['Central Processing Unit', 'Central Process Unit', 'Computer Personal Unit', 'Central Processor Unit'],
      answer: 1
    },
    { question: 'What amount of bits commonly equals one byte?', choices: ['1', '2', '8', '64'], answer: 3 },
    {
      question: 'The computer OEM manufacturer Clevo, known for its Sager notebook line, is based in which country?',
      choices: ['United States', 'Germany', 'Taiwan', 'China (People&#039;s Republic of)'],
      answer: 3
    },
    {
      question: 'What does the term GPU stand for?',
      choices: [
        'Graphics Processing Unit',
        'Gaming Processor Unit',
        'Graphite Producing Unit',
        'Graphical Proprietary Unit'
      ],
      answer: 1
    },
    {
      question: 'Which RAID array type is associated with data mirroring?',
      choices: ['RAID 0', 'RAID 10', 'RAID 1', 'RAID 5'],
      answer: 3
    },
    {
      question:
        'Released in 2001, the first edition of Apple&#039;s Mac OS X operating system (version 10.0) was given what animal code name?',
      choices: ['Cheetah', 'Puma', 'Tiger', 'Leopard'],
      answer: 1
    },
    {
      question: 'In programming, what do you call functions with the same name but different implementations?',
      choices: ['Overloading', 'Overriding', 'Abstracting', 'Inheriting'],
      answer: 1
    },
    { question: 'How many bytes are in a single Kibibyte?', choices: ['2400', '1000', '1240', '1024'], answer: 4 }
  ];
};

export default getQuestionMock;
