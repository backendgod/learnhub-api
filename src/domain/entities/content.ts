import { IUserDto } from "./user";

export interface ICreateContentDto {
  videoUrl: string;
  comment: string;
  rating: number;
}

export interface ICreateContent extends ICreateContentDto {
  videoTitle: string;
  thumbnailUrl: string;
  creatorName: string;
  creatorUrl: string;

  // The original code embeds more user data here,
  // but I think we only need user ID.
  userId: string;
}

export interface IContent extends ICreateContent {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContentWithUserDto extends IContent {
  user: IUserDto;
}

// Remove fields userId and user from IContentWithUserDto
export interface IContentDto
  extends Omit<Omit<IContentWithUserDto, "userId">, "user"> {
  postedBy: IUserDto;
}

export function toIContentDto(data: IContentWithUserDto): IContentDto {
  return {
    ...data,
    postedBy: data.user,
  };
}

export function toIContentDtos(data: IContentWithUserDto[]): IContentDto[] {
  return data.map((dat) => toIContentDto(dat));
}
