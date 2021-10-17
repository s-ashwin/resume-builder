import create from 'zustand';
import { intro, social, experience, skills, achievements, education } from 'src/stores/data';
import { arrayMoveImmutable } from 'array-move';

export const useIntro = create((set) => ({
  name: intro.name,
  role: intro.role,
  mobile: intro.mobile,
  email: intro.email,
  location: intro.location,
  photo: intro.photo,
  about: intro.about,
  objective: intro.objective,
  relExp: intro.relExp,
  totalExp: intro.totalExp,

  setField: (field: string, value: string) =>
    set((state: any) => {
      state[field] = value; // eslint-disable-line no-param-reassign
    }),
}));

export const useSocial = create((set) => ({
  linkedin: social.linkedin,
  github: social.github,
  hackerrank: social.hackerrank,
  hackerearth: social.hackerearth,
  codechef: social.codechef,
  codeforces: social.codeforces,
  twitter: social.twitter,
  leetcode: social.leetcode,
  devto: social.devto,
  medium: social.medium,
  hashnode: social.hashnode,
  wordpress: social.wordpress,
  squarespace: social.squarespace,
  behance: social.behance,
  dribbble: social.dribbble,

  setField: (event: InputEvent) =>
    set((state: any) => {
      const field = (<HTMLElement>event.target).dataset.label;

      if (field === undefined) return;
      state[field] = (<HTMLInputElement>event.target)?.value; // eslint-disable-line no-param-reassign
    }),
}));

export const useExp = create((set) => ({
  companies: experience,

  setField: (event: InputEvent) =>
    set((state: any) => {
      const field = (<HTMLElement>event.target).dataset.label;

      if (field === undefined) return;
      state[field] = (<HTMLInputElement>event.target)?.value; // eslint-disable-line no-param-reassign
    }),

  add: () =>
    set((state: any) => {
      const newCompnaies = [
        ...state.companies,
        {
          name: 'Company',
          role: 'Role',
          from: 'from',
          to: 'to',
          years: '1 year',
          description: '* Point 1\n* Point 2\n* Point 3',
        },
      ];
      return {
        ...state,
        companies: newCompnaies,
      };
    }),

  update: (index, field, value) =>
    set((state: any) => {
      const newCompnaies = [...state.companies];
      newCompnaies[index][field] = value;
      return {
        ...state,
        companies: newCompnaies,
      };
    }),

  purge: (index: number) =>
    set((state: any) => {
      const newCompnaies = state.companies.filter((_, ind) => ind !== index);
      return {
        ...state,
        companies: newCompnaies,
      };
    }),

  changeOrder: ({ oldIndex, newIndex }) =>
    set((state: any) => ({
      ...state,
      companies: arrayMoveImmutable(state.companies, oldIndex, newIndex),
    })),
}));

export const useAchievements = create(() => ({
  keyProjects: achievements.keyProjects,
  certificates: achievements.certificates,
}));

export const useSkills = create((set) => ({
  languages: skills.languages,
  frameworks: skills.frameworks,
  libraries: skills.libraries,
  databases: skills.databases,
  technologies: skills.technologies,
  practices: skills.practices,
  tools: skills.tools,

  add: (type: string, name = '', rating = 1) =>
    set((state: any) => {
      if (state[type].some((skill) => skill.name === '')) return;

      state[type] = [...state[type]]; // eslint-disable-line no-param-reassign
      state[type].push({ name, rating }); // eslint-disable-line no-param-reassign
    }),

  update: (type: string, index: number, key: 'name' | 'rating', value: string | number) =>
    set((state: any) => {
      state[type] = [...state[type]]; // eslint-disable-line no-param-reassign
      state[type][index][key] = value; // eslint-disable-line no-param-reassign
    }),

  purge: (type: string, index: number) =>
    set((state: any) => {
      state[type] = state[type].filter((_, ind) => index !== ind); // eslint-disable-line no-param-reassign
    }),

  changeOrder: (type: string, oldIndex: number, newIndex: number) =>
    set((state: any) => ({
      ...state,
      [type]: arrayMoveImmutable(state[type], oldIndex, newIndex),
    })),
}));

export const useEducation = create((set) => ({
  education,

  add: () =>
    set((state: any) => ({
      education: [
        ...state.education,
        {
          institution: '',
          url: '',
          studyType: 'Degree',
          area: '',
          startDate: '',
          endDate: '',
          score: '',
          courses: [],
        },
      ],
    })),

  update: (index, field, value) =>
    set((state: any) => {
      const newEducation = [...state.education];
      newEducation[index][field] = value;
      return {
        education: newEducation,
      };
    }),

  purge: (index: number) =>
    set((state: any) => ({ education: state.education.filter((_, ind) => ind !== index) })),

  changeOrder: ({ oldIndex, newIndex }) =>
    set((state: any) => ({
      education: arrayMoveImmutable(state.education, oldIndex, newIndex),
    })),
}));
