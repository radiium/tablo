import { Medias } from './media.model';

export interface Picture {
    id?: string;
    type: string;
    from: string;
    artiste: string;
    artisteBio: string;
    date: string;
    title: string;
    subTitle: string;
    medium: string;
    dimensions: string;
    classification: string;
    credits: string;
    originalData?: any;
    medias: Medias;
}
