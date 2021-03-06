import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1636215449688 implements MigrationInterface {
    name = 'Init1636215449688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "fee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price_start" integer NOT NULL, "price_end" integer NOT NULL, "delivery_fee" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurant_id" integer)`);
        await queryRunner.query(`CREATE TABLE "participant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "user_id" integer)`);
        await queryRunner.query(`CREATE TABLE "purchasement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "user_id" integer, CONSTRAINT "REL_7c49348ccf164c71f5e7ef84de" UNIQUE ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "message" varchar NOT NULL, "max_participants" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurant_id" integer, "creator_id" integer, "fee_id" integer)`);
        await queryRunner.query(`CREATE TABLE "order_menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "menu_id" integer)`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "image_key" varchar NOT NULL, "restaurant_id" integer)`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "account" varchar NOT NULL, "open_at" datetime NOT NULL, "close_at" datetime NOT NULL, "image_key" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "category_id" integer)`);
        await queryRunner.query(`CREATE TABLE "zone" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "university_id" integer, "restaurant_id" integer)`);
        await queryRunner.query(`CREATE TABLE "university" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "region_id" integer)`);
        await queryRunner.query(`CREATE TABLE "region" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "manner" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "phone_number" varchar NOT NULL, "point" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "region_id" integer, "university_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "salt" varchar NOT NULL, "user_id" integer, CONSTRAINT "REL_9922406dc7d70e20423aeffadf" UNIQUE ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "temporary_fee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price_start" integer NOT NULL, "price_end" integer NOT NULL, "delivery_fee" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurant_id" integer, CONSTRAINT "FK_1415ccec8a50551ed3baad43d72" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_fee"("id", "price_start", "price_end", "delivery_fee", "created_at", "updated_at", "restaurant_id") SELECT "id", "price_start", "price_end", "delivery_fee", "created_at", "updated_at", "restaurant_id" FROM "fee"`);
        await queryRunner.query(`DROP TABLE "fee"`);
        await queryRunner.query(`ALTER TABLE "temporary_fee" RENAME TO "fee"`);
        await queryRunner.query(`CREATE TABLE "temporary_participant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "user_id" integer, CONSTRAINT "FK_cf9113dc486e9d53e33807cf6f7" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_7916773e236a9cfc13d59f96a4a" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_participant"("id", "created_at", "updated_at", "order_id", "user_id") SELECT "id", "created_at", "updated_at", "order_id", "user_id" FROM "participant"`);
        await queryRunner.query(`DROP TABLE "participant"`);
        await queryRunner.query(`ALTER TABLE "temporary_participant" RENAME TO "participant"`);
        await queryRunner.query(`CREATE TABLE "temporary_purchasement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "user_id" integer, CONSTRAINT "REL_7c49348ccf164c71f5e7ef84de" UNIQUE ("order_id"), CONSTRAINT "FK_7c49348ccf164c71f5e7ef84de5" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_ef11c402a98468698922f97f71c" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_purchasement"("id", "created_at", "updated_at", "order_id", "user_id") SELECT "id", "created_at", "updated_at", "order_id", "user_id" FROM "purchasement"`);
        await queryRunner.query(`DROP TABLE "purchasement"`);
        await queryRunner.query(`ALTER TABLE "temporary_purchasement" RENAME TO "purchasement"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "message" varchar NOT NULL, "max_participants" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurant_id" integer, "creator_id" integer, "fee_id" integer, CONSTRAINT "FK_3edfcab660a53a1ac59e0e51911" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_5afa7e27cce8bc1b75ea54968c8" FOREIGN KEY ("creator_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_82816cf2eaae947ff6fc15da26d" FOREIGN KEY ("fee_id") REFERENCES "fee" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "message", "max_participants", "created_at", "updated_at", "restaurant_id", "creator_id", "fee_id") SELECT "id", "message", "max_participants", "created_at", "updated_at", "restaurant_id", "creator_id", "fee_id" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_order_menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "menu_id" integer, CONSTRAINT "FK_3f68e4390f5d103a5efcfd3fd1c" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_618cfc966ad6dc5f50504bcba7d" FOREIGN KEY ("menu_id") REFERENCES "menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_order_menu"("id", "created_at", "updated_at", "order_id", "menu_id") SELECT "id", "created_at", "updated_at", "order_id", "menu_id" FROM "order_menu"`);
        await queryRunner.query(`DROP TABLE "order_menu"`);
        await queryRunner.query(`ALTER TABLE "temporary_order_menu" RENAME TO "order_menu"`);
        await queryRunner.query(`CREATE TABLE "temporary_menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "image_key" varchar NOT NULL, "restaurant_id" integer, CONSTRAINT "FK_a9c5473205703022c7a53a410c2" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_menu"("id", "name", "price", "image_key", "restaurant_id") SELECT "id", "name", "price", "image_key", "restaurant_id" FROM "menu"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`ALTER TABLE "temporary_menu" RENAME TO "menu"`);
        await queryRunner.query(`CREATE TABLE "temporary_restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "account" varchar NOT NULL, "open_at" datetime NOT NULL, "close_at" datetime NOT NULL, "image_key" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "category_id" integer, CONSTRAINT "FK_848ac5e4e3e511560d07e36a257" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_restaurant"("id", "name", "account", "open_at", "close_at", "image_key", "created_at", "updated_at", "category_id") SELECT "id", "name", "account", "open_at", "close_at", "image_key", "created_at", "updated_at", "category_id" FROM "restaurant"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`ALTER TABLE "temporary_restaurant" RENAME TO "restaurant"`);
        await queryRunner.query(`CREATE TABLE "temporary_zone" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "university_id" integer, "restaurant_id" integer, CONSTRAINT "FK_bbf299b3c534c78fd7896f7df67" FOREIGN KEY ("university_id") REFERENCES "university" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_5b545fdb303b329fde24d0d4279" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_zone"("id", "created_at", "updated_at", "university_id", "restaurant_id") SELECT "id", "created_at", "updated_at", "university_id", "restaurant_id" FROM "zone"`);
        await queryRunner.query(`DROP TABLE "zone"`);
        await queryRunner.query(`ALTER TABLE "temporary_zone" RENAME TO "zone"`);
        await queryRunner.query(`CREATE TABLE "temporary_university" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "region_id" integer, CONSTRAINT "FK_d3b5700d08c2113fdcde2e9e35a" FOREIGN KEY ("region_id") REFERENCES "region" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_university"("id", "name", "region_id") SELECT "id", "name", "region_id" FROM "university"`);
        await queryRunner.query(`DROP TABLE "university"`);
        await queryRunner.query(`ALTER TABLE "temporary_university" RENAME TO "university"`);
        await queryRunner.query(`CREATE TABLE "temporary_manner" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer, CONSTRAINT "FK_298c85d87247dd15bead6f7c7b2" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_manner"("id", "user_id") SELECT "id", "user_id" FROM "manner"`);
        await queryRunner.query(`DROP TABLE "manner"`);
        await queryRunner.query(`ALTER TABLE "temporary_manner" RENAME TO "manner"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "phone_number" varchar NOT NULL, "point" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "region_id" integer, "university_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "FK_68c168fe38b5826502b831f9f83" FOREIGN KEY ("region_id") REFERENCES "region" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1518391a178a27840edf478c7b9" FOREIGN KEY ("university_id") REFERENCES "university" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "name", "phone_number", "point", "created_at", "updated_at", "region_id", "university_id") SELECT "id", "email", "name", "phone_number", "point", "created_at", "updated_at", "region_id", "university_id" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_auth" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "salt" varchar NOT NULL, "user_id" integer, CONSTRAINT "REL_9922406dc7d70e20423aeffadf" UNIQUE ("user_id"), CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_auth"("id", "password", "salt", "user_id") SELECT "id", "password", "salt", "user_id" FROM "auth"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`ALTER TABLE "temporary_auth" RENAME TO "auth"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" RENAME TO "temporary_auth"`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "salt" varchar NOT NULL, "user_id" integer, CONSTRAINT "REL_9922406dc7d70e20423aeffadf" UNIQUE ("user_id"))`);
        await queryRunner.query(`INSERT INTO "auth"("id", "password", "salt", "user_id") SELECT "id", "password", "salt", "user_id" FROM "temporary_auth"`);
        await queryRunner.query(`DROP TABLE "temporary_auth"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "phone_number" varchar NOT NULL, "point" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "region_id" integer, "university_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "name", "phone_number", "point", "created_at", "updated_at", "region_id", "university_id") SELECT "id", "email", "name", "phone_number", "point", "created_at", "updated_at", "region_id", "university_id" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "manner" RENAME TO "temporary_manner"`);
        await queryRunner.query(`CREATE TABLE "manner" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "manner"("id", "user_id") SELECT "id", "user_id" FROM "temporary_manner"`);
        await queryRunner.query(`DROP TABLE "temporary_manner"`);
        await queryRunner.query(`ALTER TABLE "university" RENAME TO "temporary_university"`);
        await queryRunner.query(`CREATE TABLE "university" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "region_id" integer)`);
        await queryRunner.query(`INSERT INTO "university"("id", "name", "region_id") SELECT "id", "name", "region_id" FROM "temporary_university"`);
        await queryRunner.query(`DROP TABLE "temporary_university"`);
        await queryRunner.query(`ALTER TABLE "zone" RENAME TO "temporary_zone"`);
        await queryRunner.query(`CREATE TABLE "zone" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "university_id" integer, "restaurant_id" integer)`);
        await queryRunner.query(`INSERT INTO "zone"("id", "created_at", "updated_at", "university_id", "restaurant_id") SELECT "id", "created_at", "updated_at", "university_id", "restaurant_id" FROM "temporary_zone"`);
        await queryRunner.query(`DROP TABLE "temporary_zone"`);
        await queryRunner.query(`ALTER TABLE "restaurant" RENAME TO "temporary_restaurant"`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "account" varchar NOT NULL, "open_at" datetime NOT NULL, "close_at" datetime NOT NULL, "image_key" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "category_id" integer)`);
        await queryRunner.query(`INSERT INTO "restaurant"("id", "name", "account", "open_at", "close_at", "image_key", "created_at", "updated_at", "category_id") SELECT "id", "name", "account", "open_at", "close_at", "image_key", "created_at", "updated_at", "category_id" FROM "temporary_restaurant"`);
        await queryRunner.query(`DROP TABLE "temporary_restaurant"`);
        await queryRunner.query(`ALTER TABLE "menu" RENAME TO "temporary_menu"`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "image_key" varchar NOT NULL, "restaurant_id" integer)`);
        await queryRunner.query(`INSERT INTO "menu"("id", "name", "price", "image_key", "restaurant_id") SELECT "id", "name", "price", "image_key", "restaurant_id" FROM "temporary_menu"`);
        await queryRunner.query(`DROP TABLE "temporary_menu"`);
        await queryRunner.query(`ALTER TABLE "order_menu" RENAME TO "temporary_order_menu"`);
        await queryRunner.query(`CREATE TABLE "order_menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "menu_id" integer)`);
        await queryRunner.query(`INSERT INTO "order_menu"("id", "created_at", "updated_at", "order_id", "menu_id") SELECT "id", "created_at", "updated_at", "order_id", "menu_id" FROM "temporary_order_menu"`);
        await queryRunner.query(`DROP TABLE "temporary_order_menu"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "message" varchar NOT NULL, "max_participants" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurant_id" integer, "creator_id" integer, "fee_id" integer)`);
        await queryRunner.query(`INSERT INTO "order"("id", "message", "max_participants", "created_at", "updated_at", "restaurant_id", "creator_id", "fee_id") SELECT "id", "message", "max_participants", "created_at", "updated_at", "restaurant_id", "creator_id", "fee_id" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "purchasement" RENAME TO "temporary_purchasement"`);
        await queryRunner.query(`CREATE TABLE "purchasement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "user_id" integer, CONSTRAINT "REL_7c49348ccf164c71f5e7ef84de" UNIQUE ("order_id"))`);
        await queryRunner.query(`INSERT INTO "purchasement"("id", "created_at", "updated_at", "order_id", "user_id") SELECT "id", "created_at", "updated_at", "order_id", "user_id" FROM "temporary_purchasement"`);
        await queryRunner.query(`DROP TABLE "temporary_purchasement"`);
        await queryRunner.query(`ALTER TABLE "participant" RENAME TO "temporary_participant"`);
        await queryRunner.query(`CREATE TABLE "participant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "order_id" integer, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "participant"("id", "created_at", "updated_at", "order_id", "user_id") SELECT "id", "created_at", "updated_at", "order_id", "user_id" FROM "temporary_participant"`);
        await queryRunner.query(`DROP TABLE "temporary_participant"`);
        await queryRunner.query(`ALTER TABLE "fee" RENAME TO "temporary_fee"`);
        await queryRunner.query(`CREATE TABLE "fee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price_start" integer NOT NULL, "price_end" integer NOT NULL, "delivery_fee" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurant_id" integer)`);
        await queryRunner.query(`INSERT INTO "fee"("id", "price_start", "price_end", "delivery_fee", "created_at", "updated_at", "restaurant_id") SELECT "id", "price_start", "price_end", "delivery_fee", "created_at", "updated_at", "restaurant_id" FROM "temporary_fee"`);
        await queryRunner.query(`DROP TABLE "temporary_fee"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "manner"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "university"`);
        await queryRunner.query(`DROP TABLE "zone"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`DROP TABLE "order_menu"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "purchasement"`);
        await queryRunner.query(`DROP TABLE "participant"`);
        await queryRunner.query(`DROP TABLE "fee"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
