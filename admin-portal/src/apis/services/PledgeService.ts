import http from "../httpCommon";
import { PledgeActivity } from "../../types/PledgeActivity";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";

export class PledgeService {
  static deletePledge(pledgeID: number | string) {
    return http.delete(`pledges/${pledgeID}`);
  }

  static getUpdateComments(pledgeID: number | string) {
    return http.get<PledgeActivity[]>(`pledges/${pledgeID}/updatecomments`);
  }

  static upsertUpdateComment(
    pledgeID: number | string,
    comment: PledgeActivity
  ) {
    return http.put<AidPackageUpdateComment>(
      `pledges/${pledgeID}/updatecomment`,
      comment
    );
  }

  static deleteUpdateComment(
    pledgeID: number | string,
    pledgeUpdateId: number
  ) {
    return http.delete(`pledges/${pledgeID}/updatecomment/${pledgeUpdateId}`);
  }
}
