export const modules = [
  {
    id: 'family-education',
    number: '01',
    period: 'Before mass schooling',
    title: 'Family Education',
    summary: 'How families, communities, work, religion, and domestic life shaped learning before and alongside formal institutions.',
    status: 'prototype',
  },
  {
    id: 'common-school',
    number: '02',
    period: 'Nineteenth century',
    title: 'Common School',
    summary: 'The growth of common-school systems and the contested promise of education for a broad public.',
    status: 'planned',
  },
  {
    id: 'public-school',
    number: '03',
    period: 'Late nineteenth–twentieth century',
    title: 'Public School',
    summary: 'How public education expanded, standardized, sorted, included, and excluded students and communities.',
    status: 'planned',
  },
  {
    id: 'education-and-civil-rights',
    number: '04',
    period: 'Twentieth–twenty-first century',
    title: 'Education and Civil Rights',
    summary: 'Education as a major arena for struggles over race, gender, disability, citizenship, access, and belonging.',
    status: 'planned',
  },
]

export const sampleArtifacts = [
  {
    id: 'family-text-01',
    moduleId: 'family-education',
    type: 'Text',
    title: 'Household Learning Record',
    description: 'Placeholder text artifact for testing close reading, professor commentary, and notebook-linked observation.',
    media: {
      excerpt: 'Monday: reading practiced after the morning work; figures reviewed while household accounts were prepared.',
      context: 'This invented transcription exists only to test presentation, close reading, and accessible text handling. It is not a historical quotation.',
      transcript: [
        'Monday: reading practiced after the morning work; figures reviewed while household accounts were prepared.',
        'Tuesday: younger children repeated letters aloud; an older child copied names and sums into the household book.',
        'Prototype notice: this text was written for interface testing and is not a historical source.',
      ],
    },
  },
  {
    id: 'family-image-01',
    moduleId: 'family-education',
    type: 'Image',
    title: 'Learning in a Domestic Space',
    description: 'Placeholder image artifact for testing visual inspection, description, annotation, and evidentiary questions.',
    media: {
      sourceType: 'local',
      src: './media/domestic-learning.svg',
      alt: 'Simplified prototype illustration of two people seated at a table with books in a domestic room.',
      caption: 'Prototype illustration created to test the image-viewing interface. It is not a historical artifact.',
      longDescription: 'A rectangular room is shown in a simplified flat illustration. Two human figures sit opposite one another at a wooden table. Two closed books rest between them. A four-pane window appears behind the figure on the right. Text beneath the scene identifies it as prototype media rather than a historical artifact.',
    },
  },
  {
    id: 'family-audio-01',
    moduleId: 'family-education',
    type: 'Audio',
    title: 'Remembering Informal Education',
    description: 'Placeholder audio artifact for testing native playback controls, transcripts, commentary, and artifact-linked notes.',
    media: {
      sourceType: 'local',
      src: './media/prototype-audio.wav',
      mimeType: 'audio/wav',
      description: 'This short tone is locally hosted prototype media. The transcript demonstrates how a future oral-history recording would remain accessible without audio playback.',
      transcript: [
        'Prototype transcript: A speaker recalls learning practical skills from relatives and neighbors outside a formal classroom.',
        'The final oral-history transcript would identify speakers, editorial interventions, unclear passages, and relevant rights or consent conditions.',
      ],
    },
  },
  {
    id: 'family-video-01',
    moduleId: 'family-education',
    type: 'Video',
    title: 'Professor-Curator Commentary',
    description: 'Placeholder video artifact for testing captions, transcripts, native controls, and commentary presentation.',
    media: {
      sourceType: 'local',
      src: './media/prototype-video.mp4',
      mimeType: 'video/mp4',
      captions: './captions/prototype-video.vtt',
      description: 'This locally hosted test video contains on-screen text and an English caption track. Final commentary may be recorded by Georga.',
      transcript: [
        'Prototype audiovisual artifact.',
        'Local media for accessibility testing.',
      ],
    },
  },
]

export const sampleActivities = [
  {
    id: 'family-reflection-01',
    moduleId: 'family-education',
    type: 'written-response',
    title: 'Observe before interpreting',
    prompt: 'Choose one artifact and record two details that seem historically significant before reading any interpretive commentary.',
    artifactIds: ['family-text-01', 'family-image-01', 'family-audio-01', 'family-video-01'],
  },
  {
    id: 'family-quiz-01',
    moduleId: 'family-education',
    type: 'multiple-choice',
    title: 'Check your reading of the room',
    prompt: 'Which statement best reflects the provisional argument of this prototype room?',
    options: [
      { id: 'a', label: 'Education occurred only after formal schools were established.' },
      { id: 'b', label: 'Education took place through families, communities, work, and institutions in overlapping ways.' },
      { id: 'c', label: 'Family education and public education were entirely separate historical systems.' },
    ],
    correctOptionId: 'b',
    feedback: {
      correct: 'This answer recognizes that educational practices overlapped rather than replacing one another in a simple sequence.',
      incorrect: 'Return to the room introduction and consider whether formal institutions replaced—or existed alongside—other forms of learning.',
    },
  },
  {
    id: 'family-compare-01',
    moduleId: 'family-education',
    type: 'compare-response',
    title: 'Compare your interpretation',
    prompt: 'How might attention to family education change a history focused only on schools and universities?',
    comparison: 'A historian might argue that beginning with families broadens the history of education beyond formal institutions. It also raises questions about unpaid labor, authority, access to knowledge, and whose teaching was recognized as education.',
  },
]
