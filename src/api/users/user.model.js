import gravatar from "gravatar";

export const userRoles = ["prospect", "user", "admin"];

class User {
  constructor(id, email, alias, role, gravatar, password, createdAt, updatedAt) {
    this._id = id;
    this.email = email;
    this.alias = alias;
    this.role = role;
    this.gravatar = gravatar;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class UserBuilder {
  #id = null;
  #email;
  #alias;
  #role = "prospect";
  #gravatar;
  #password;
  #createdAt = new Date();
  #updatedAt = this.#createdAt;

  setId(id) {
    this.#id = id;
    return this;
  }

  setEmail(email) {
    this.#email = email;
    this.#gravatar = gravatar.url(email, { s: 50 });
    return this;
  }

  setAlias(alias) {
    this.#alias = alias;
    return this;
  }

  setPassword(pwd) {
    this.#password = pwd;
    return this;
  }

  setRole(role) {
    if (!userRoles.includes(role)) throw new Error(`Invalid role value "${role}"`);
    this.#role = role;
    return this;
  }

  build() {
    return new User(
      this.#id,
      this.#email,
      this.#alias,
      this.#role,
      this.#gravatar,
      this.#password,
      this.#createdAt.toISOString(),
      this.#updatedAt.toISOString(),
    );
  }
}

// class User {
//   #id;
//   #email;
//   #alias;
//   #role;
//   #gravatar;
//   #password;
//   #createdAt;
//   #updatedAt;

//   constructor(id, email, alias) {
//     this.id = id;
//     this.email = email;
//     this.alias = alias;
//     this.role = "prospect";
//     this.createdAt = new Date().toISOString();
//     this.updatedAt = this.createdAt;
//   }

//   get id() {
//     return this.#id;
//   }

//   set id(value) {
//     if (value) {
//       this.#id = ObjectId.createFromHexString(value);
//     }
//   }

//   get email() {
//     return this.#email;
//   }

//   set email(value) {
//     const email = value.trim();
//     // validate email
//     this.#email = email;
//     this.gravatar = email;
//   }

//   get alias() {
//     return this.#alias;
//   }

//   set alias(value) {
//     const alias = value.trim();
//     // validate
//     this.#alias = alias;
//   }

//   get role() {
//     return this.#role;
//   }

//   set role(value) {
//     const role = value.trim();
//     if (!userRoles.includes(role)) throw new Error(`Invalid role value "${role}"`);
//     this.#role = role;
//   }

//   get gravatar() {
//     return this.#gravatar;
//   }

//   set gravatar(email) {
//     this.#gravatar = gravatar.url(email, { s: 50 });
//   }

//   get password() {
//     return this.#password;
//   }

//   set password(value) {
//     this.#password = value;
//   }

//   get createdAt() {
//     return this.#createdAt.toISOString();
//   }

//   set createdAt(value) {
//     if (value) {
//       this.#createdAt = new Date(value);
//     } else {
//       this.#createdAt = new Date();
//     }
//   }

//   get updatedAt() {
//     return this.#updatedAt.toISOString();
//   }

//   set updatedAt(value) {
//     if (value) {
//       this.#updatedAt = new Date(value);
//     } else {
//       this.#updatedAt = new Date();
//     }
//   }

//   async hashPassword(password) {
//     const hashed = await authUtil.hashPassword(password);
//     this.password = hashed;
//   }

//   toJSON() {
//     const result = {
//       email: this.email,
//       alias: this.alias,
//       role: this.role,
//       gravatar: this.gravatar,
//       createdAt: this.createdAt,
//       updatedAt: this.updatedAt,
//     };
//     if (this.id) result._id = this.id;
//     return JSON.stringify(result);
//   }
// }
