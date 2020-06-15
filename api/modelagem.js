
model User {
    id       Int       @default(autoincrement()) @id
    name     String    @default("")
    email    String    @unique
    password String
    admin    Boolean   @default(false)
    Article  Article[]
}

model Tag {
    id        Int      @default(autoincrement()) @id
    name      String
    parent    Tag      @relation(fields: [parentId], references: [id])
    parentId  Int
    Tag       Tag[]    @relation("TagToTag")
    Article   Article? @relation(fields: [articleId], references: [id])
    articleId Int?
}

model Article {
    id          Int    @default(autoincrement()) @id
    title       String
    description String
    imageUrl    String
    content     String
    user        User   @relation(fields: [userId], references: [id])
    userId      Int
    Tag         Tag[]

}
