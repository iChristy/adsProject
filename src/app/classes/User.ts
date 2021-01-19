export class User {
  id: string;
  name: string;
  role: string;
  companyId: string;
  houses: Array<string>;
  typeWork?: string;
  ownPrefix?: string;
  masterLeader?: string;
  companyIdSocket?: string;

  // constructor(id: string, name: string, role: string, companyId: string, houses: Array<string>,
  //             workType: string, ownPrefix: string, masterLeader: string, companyIdSocket: string) {
  //   this.id = id;
  //   this.name = name;
  //   this.role = role;
  //   this.companyId = companyId;
  //   this.houses = houses;
  //   this.workType = workType;
  //   this.ownPrefix = ownPrefix;
  //   this.masterLeader = masterLeader;
  //   this.companyIdSocket = companyIdSocket;
  // }
}
