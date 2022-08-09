export interface PledgeActivity extends PledgeActivityUpsert {
  dateTime: number;
}

export interface PledgeActivityUpsert {
  pledgeID: number;
  pledgeUpdateID: number;
  updateComment: string;
}
