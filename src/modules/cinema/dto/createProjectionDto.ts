enum ProjectionType {
  PROJECTION_2D = '2D',
  PROJECTION_3D = '3D',
  PROJECTION_4DX = '4DX',
}

export interface CreateProjection {
  date: Date;
  time: string;
  cinema: string;
  hall: number;
  isPremiere: boolean;
  type:
    | ProjectionType.PROJECTION_2D
    | ProjectionType.PROJECTION_3D
    | ProjectionType.PROJECTION_4DX;
}
