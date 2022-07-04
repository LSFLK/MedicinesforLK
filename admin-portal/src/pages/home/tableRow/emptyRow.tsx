import React, { ReactElement, useEffect, useState } from "react";

interface EmptyRowProps {}

export function EmptyRow(props: EmptyRowProps) {
  return <tr>No Data Found</tr>;
}
