import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list("/categories", ref => {
        return ref.orderByChild("name");
      })
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(c => {
            const key = c.key;
            const data = c.payload.val();
            return { key, ...data };
          })
        )
      );
  }
}
