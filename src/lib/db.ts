import { Record } from "@/types";
import Dexie, { Table } from "dexie";

class AppDataBase extends Dexie {
  records!: Table<Record>;

  constructor() {
    super("money-tracker-database", {});
    this.version(1).stores({
      records: "++id, amount, description, category, type, paymentMethod, date",
    });
  }
}

export const db = new AppDataBase();
