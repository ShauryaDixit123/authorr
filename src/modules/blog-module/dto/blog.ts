export interface CreateBlogRequestDTO {
  title: string;
  description?: string;
  posted_by: string;
}
export interface ContentTypeDTO {
  name: string;
  type?: string;
}
export interface BlogContentDTO {
  id?: number;
  content: string;
  blog: string;
  type: string;
  slug: string;
}
export interface BlogMediaDTO {
  blog: string;
  media: number;
  type: string;
  blogContent: number;
}
export interface StyleBlogContentDTO {
  blogContent: number;
  style: string;
}
export interface BlogHeirarchyDTO {
  blog: string;
  parent: number;
}
// export interface BlogContentDTO {
//   id?: number;
//   content: string;
//   blog: string;
//   type: string;
// }
