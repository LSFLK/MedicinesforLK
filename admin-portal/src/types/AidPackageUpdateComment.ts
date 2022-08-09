export interface AidPackageUpdateComment extends AidPackageUpsertUpdateComment {
  dateTime: string;
}

export interface AidPackageUpsertUpdateComment {
  packageID: number;
  packageUpdateID: number;
  updateComment: string;
}
