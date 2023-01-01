import type { CourseCategoryType } from '../shared/enum/category';
import type { ICodeComponent, LessonComponentProps } from '../shared/interface';
import type { TestResult } from '../utils/example';
import axiosClient from './axiosClient';

interface ExecuteRequest {
  code: string | undefined;
  testCode: string | undefined;
}

interface ExecuteResponse {
  data: TestResult[];
}

interface ExecuteRequest {
  language: string;
  testCode: string | undefined;
  code: string | undefined;
  executeCode: string | undefined;
}

interface SaveLessonRequest {
  id: number;
  course_category_id: number;
  title: string;
  summary: string;
  components: LessonComponentProps[];
}

interface SaveCourseRequest {
  id: number;
  name: string;
  summary: string;
  thumbnail: string;
  price: number;
  tags: string[];
}

export const CodeSmoothApi = {
  uploadFiles: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    return axiosClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  execute: ({ code, testCode, language, executeCode }: ExecuteRequest) => {
    return axiosClient.post<ExecuteResponse>(`/api/execute/`, {
      code,
      testCode,
      executeCode,
      language,
    });
  },

  createCategory: (title: string, id: number, course_id: number, type: CourseCategoryType) => {
    return axiosClient.post('/api/admin/category', {
      title,
      id: Number(id),
      type,
      courseId: Number(course_id),
    });
  },

  updateCategory: (title: string, id: number) => {
    return axiosClient.patch(`/api/admin/category/${id}`, {
      title,
    });
  },

  saveLesson: (params: SaveLessonRequest) => {
    const copy = params.components.map((component) => {
      return {
        ...component,
        content: {
          ...component.content,
        },
      };
    });
    // delete isFocus
    copy.forEach((component) => {
      delete component.isFocus;
    });

    return axiosClient.post('/api/admin/lesson', {
      id: Number(params.id),
      title: params.title,
      summary: params.summary,
      components: copy,
      course_category_id: Number(params.course_category_id),
    });
  },

  getLessonById: (id: number) => {
    return axiosClient.get(`/api/admin/lesson/${id}`);
  },

  getSampleForLanguage: (language: string) => {
    return axiosClient.get(`/api/admin/sample/${language}`);
  },

  createSampleForLanguage: (language: string, sample: ICodeComponent) => {
    return axiosClient.post(`/api/admin/sample`, {
      language,
      sample,
    });
  },

  saveCourse: (params: SaveCourseRequest) => {
    return axiosClient.post('/api/admin/course', {
      id: Number(params.id),
      name: params.name,
      summary: params.summary,
      thumbnail: params.thumbnail,
      price: params.price,
      tags: params.tags,
    });
  },
  // : Promise<CodeSmoothApiResponse<ListCourseResponse>>
  getListCourses: async (): Promise<CodeSmoothApiResponseList<CourseResponse>> => {
    const response = await axiosClient.get('/api/admin/course');
    return response.data;
  },

  getCourseById: async (id: number): Promise<CodeSmoothApiResponse<CourseResponse>> => {
    const response = await axiosClient.get(`/api/admin/course/${id}`);
    return response.data;
  },

  deleteCourseById: async (id: number): Promise<CodeSmoothApiResponse<CourseResponse>> => {
    const response = await axiosClient.delete(`/api/admin/course/${id}`);
    return response.data;
  },
};

export interface CodeSmoothApiResponseList<T> {
  data: T[];
  meta: Meta;
  message: string;
}

export interface CodeSmoothApiResponse<T> {
  data: T;
  message: string;
}

export interface CourseResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: null;
  detail: string;
  thumbnail: string;
  target_audience: string;
  skills: string[];
  tags: string[];
  summary: string;
  name: string;
  price: number;
  is_published: boolean;
  category: CategoryResponse[];
}

export interface CategoryResponse {
  id: number;
  title: string;
  lessons: {
    id: number;
    title: string;
  }[];
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
