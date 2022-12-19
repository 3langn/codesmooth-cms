import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { LessionComponentProps, ITextComponent, CodeComponentProps, ICodeComponent, ILesson } from "../../shared/interface";

const initialState: ILesson = {
  name: "",
  title: "",
  summary: "",
  components: [
    // {
    //   content: {
    //     html: "",
    //   },
    //   type: "Text",
    //   isFocus: false,
    // },
  ],
};

const LessonSlice = createSlice({
  name: "lesson",
  initialState: initialState,
  reducers: {
    setLession(state, action: PayloadAction<ILesson>) {
      state.title = action.payload.title;
      state.summary = action.payload.summary;
      state.components = action.payload.components;
    },

    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setSummary(state, action: PayloadAction<string>) {
      state.summary = action.payload;
    },
    setComponents(state, action: PayloadAction<LessionComponentProps[]>) {
      state.components = action.payload;
    },
    setTextContent(state, action: PayloadAction<{ content: ITextComponent; index: number }>) {
      const copy: any = state.components;
      copy[action.payload.index] = action.payload;
      state.components = copy;
    },
    setComponent(
      state,
      action: PayloadAction<{ component: LessionComponentProps; index?: number }>,
    ) {
      const copy: any = state.components;
      copy[action.payload.index!] = action.payload.component;
      state.components = copy;
    },
    setComponentType(state, action: PayloadAction<{ type: string; index: number }>) {
      const copy: any = state.components;
      let component: LessionComponentProps;
      if (action.payload.type === "Code") {
        component = {
          content: {
            code: "",
            judgeContent: {
              testCode: "",
              executeCode: "",
            },
            language: "typescript",
            runable: false,
            timeLimit: 1000,
            allowDownload: false,
          },
          type: "Code",
        };
      } else {
        component = {
          content: {
            html: "",
          },
          type: "Text",
        };
      }
      copy[action.payload.index] = component;
      state.components = copy;
    },
    addComponent(state, action: PayloadAction<LessionComponentProps>) {
      const copy: any = state.components;
      for (let i = 0; i < state.components.length; i++) {
        copy[i] = { ...state.components[i], isFocus: false };
      }
      copy.push({ ...action.payload, isFocus: true });
      state.components = copy;
    },
    deleteComponentByIndex(state, action: PayloadAction<number>) {
      if (state.components.length === 1) {
        return;
      }
      const copy: any = state.components;
      copy.splice(action.payload, 1);
      state.components = copy;
    },
    setFocus(state, action: PayloadAction<number>) {
      const copy: any = state.components;
      for (let i = 0; i < state.components.length; i++) {
        let isFocus = false;
        if (i === action.payload) {
          isFocus = true;
        }
        const c = { ...state.components[i], isFocus };
        copy[i] = c;
      }
      state.components = copy;
    },
    onDrag(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
      const copy: any = Object.assign([], state.components);
      const temp = copy[action.payload.dragIndex];
      copy[action.payload.dragIndex] = copy[action.payload.hoverIndex];
      copy[action.payload.hoverIndex] = temp;
      state.components = copy;
    },
    setCode(
      state,
      action: PayloadAction<{
        code?: string;
        testCode?: string;
        executeCode?: string;
        index: number;
      }>,
    ) {
      const copy: any = state.components;

      const currComponent = copy[action.payload.index] as ICodeComponent;
      copy[action.payload.index] = {
        ...currComponent,
        content: {
          ...currComponent.content,
          code: action.payload.code ?? currComponent.content.code,
          judgeContent: {
            ...currComponent.content.judgeContent,
            testCode: action.payload.testCode ?? currComponent.content.judgeContent.testCode,
            executeCode:
              action.payload.executeCode ?? currComponent.content.judgeContent.executeCode,
          },
        },
      };
      state.components = copy;
    },
    setIsTest(state, action: PayloadAction<{ isTest: boolean; index: number }>) {
      const copy: any = state.components;
      const currComponent = copy[action.payload.index] as ICodeComponent;
      copy[action.payload.index] = {
        ...currComponent,
        content: {
          ...currComponent.content,
          isTest: action.payload.isTest,
        },
      };
      state.components = copy;
    },
    setLanguage(state, action: PayloadAction<{ language: string; index: number }>) {
      const copy: any = state.components;
      const currComponent = copy[action.payload.index] as ICodeComponent;
      copy[action.payload.index] = {
        ...currComponent,
        content: {
          ...currComponent.content,
          language: action.payload.language,
        },
      };
    },
  },
});

export const {
  setLanguage,
  setIsTest,
  setCode,
  setLession,
  setTitle,
  setSummary,
  deleteComponentByIndex,
  onDrag,
  setComponents,
  setComponentType,
  setFocus,
  setComponent,
  setTextContent,
  addComponent,
} = LessonSlice.actions;

export const selectComponents = (state: RootState) => state.lesson.components;
export const selectTitle = (state: RootState) => state.lesson.title;
export const selectSummary = (state: RootState) => state.lesson.summary;
export const selectLesson = (state: RootState) => state.lesson;

export default LessonSlice.reducer;
