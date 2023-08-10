import type { ICodeContent, LessonComponentProps } from '../../shared/interface';
import axiosClient from '../axiosClient';
import type { BaseReadResponse } from '../baseHttp';

export interface SampleTestResponse {
  id: string;
  type: string;
  content: ICodeContent;
}

export interface SaveLessonRequest {
  id: number;
  title: string;
  summary: string;
  section_id: number;
  components: LessonComponentProps[];
}

export interface AddLessonDto {
  order: number;
  section_id: number;
}

export interface GetLessonResponse {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  title: string;
  order: number;
  components: LessonComponentProps<ICodeContent>[];
  summary: string;
}

export interface AddLessonResponse {
  title: string;
  order: number;
  components: any[];
  section_id: number;
  course: Course;
  owner: Course;
  section: Course;
  id: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  isCompleted: boolean;
  summary: string;
}

export interface Course {
  id: number;
}

export interface GetLessonsBySectionIDResponse {
  id: number;
  title: string;
  section_id: number;
  order: number;
}

const CodedraftsInstructorLessonApi = {
  getSampleTest: (language: string) => {
    return axiosClient.get<BaseReadResponse<SampleTestResponse>>(
      `/api/instructor/sample/${language}`,
    );
  },
  saveLesson: (data: SaveLessonRequest) => {
    return axiosClient.post<BaseReadResponse<any>>('/api/instructor/lesson', data);
  },
  getLesson: (id: number) => {
    return axiosClient.get<BaseReadResponse<GetLessonResponse>>(`/api/instructor/lesson/${id}`);
  },
  addLesson: (data: AddLessonDto) => {
    return axiosClient.post<BaseReadResponse<AddLessonResponse>>(
      '/api/instructor/lesson/add',
      data,
    );
  },
  getLessonsBySectionId: (sectionId: number) => {
    return axiosClient.get<BaseReadResponse<GetLessonsBySectionIDResponse[]>>(
      `/api/instructor/lesson/get-lession-by-section-id/${sectionId}`,
    );
  },
  deleteLesson: (lessonId: number) => {
    return axiosClient.delete<BaseReadResponse<any>>(`/api/instructor/lesson/${lessonId}`);
  },
};

export default CodedraftsInstructorLessonApi;
