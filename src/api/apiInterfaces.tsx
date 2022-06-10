import { ReactNode } from "react";

export interface Movie {
  MediaId: number;
  Title: string;
  Description: string;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  StreamId: number;
  Provider: string;
  ContentUrl: string;
}
export interface MovieError {
  MessageKey: string;
}
export interface Image {
  Id: number;
  MediaId: number;
  PlatformCode: string;
  ImageTypeCode: string;
  Url: string;
  Width: number;
  Height: number;
}

export interface Product {
  Id: number;
}

export interface Entity {
  Id: number;
  Guid: string;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  MediaAgeRestrictionValueMin: number;
  MediaAgeRestrictionImageUrl: string;
  Title: string;
  Description: string;
  Year: number;
  Duration: number;
  IsTrialContentAvailable: boolean;
  AvailableFrom: Date;
  Images: Image[];
  Products: Product[];
  StartDateTime?: Date;
}

export interface RootObject {
  CacheDataValidTo: Date;
  SourceType: string;
  Entities: Entity[];
  PageSize: number;
  PageNumber: number;
  TotalCount: number;
}

export type ContextTypes = {
  logged: boolean;
  loginAnnonymous: () => Promise<void>;
  loginWithPassword: (login: string, password: string) => Promise<void>;
  isLoggedAnyUser: boolean;
};

export interface VideoContextProviderProps {
  children: ReactNode;
}
