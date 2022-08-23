export interface AidPackageUpdateComment extends AidPackageUpsertUpdateComment {
  dateTime: number;
}

export interface AidPackageUpsertUpdateComment {
  packageID: number;
  packageUpdateID: number;
  updateComment: string;
}
