import { PledgeActivity } from "../../types/PledgeActivity";
import { Pledge } from "../../types/Pledge";
import Http from "../httpCommon";

export default class PledgeService {
  static http: Http;

  static getPledge(pledgeID: number | string) {
    return PledgeService.http.get<Pledge>(`pledges/${pledgeID}`);
  }

  static updatePledge(pledgeID: number | string, pledge: Pledge) {
    return PledgeService.http.put<Pledge, Pledge>(
      `pledges/${pledgeID}`,
      pledge
    );
  }

  static updatePledgeStatus(pledgeID: number | string, status: Pledge.Status) {
    return PledgeService.http.patch<Pledge, Pledge>(
      `pledges/${pledgeID}/status/${status}`
    );
  }

  static deletePledge(pledgeID: number | string) {
    return PledgeService.http.delete(`pledges/${pledgeID}`);
  }

  static getUpdateComments(pledgeID: number | string) {
    return PledgeService.http.get<PledgeActivity[]>(
      `pledges/${pledgeID}/updatecomments`
    );
  }

  static upsertUpdateComment(
    pledgeID: number | string,
    comment: PledgeActivity
  ) {
    return PledgeService.http.put<PledgeActivity, PledgeActivity>(
      `pledges/${pledgeID}/updatecomment`,
      comment
    );
  }

  static deleteUpdateComment(
    pledgeID: number | string,
    pledgeUpdateId: number
  ) {
    return PledgeService.http.delete(
      `pledges/${pledgeID}/updatecomment/${pledgeUpdateId}`
    );
  }
}
