-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMININO', 'NAO_INFORMADO');

-- CreateTable
CREATE TABLE "cadastro_admin" (
    "id" TEXT NOT NULL,
    "pseudoNome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cadastro_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cadastrar_usuarios" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sobrenome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(300),
    "email" VARCHAR(100) NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "genero" "Genero" NOT NULL DEFAULT 'NAO_INFORMADO',
    "password" VARCHAR(100) NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cadastrar_usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cadastro_minha_lista" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "uva" VARCHAR(50) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,
    "regiao" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(300),
    "nota" INTEGER NOT NULL,
    "favorito" BOOLEAN,
    "IdUsuario" TEXT NOT NULL,

    CONSTRAINT "cadastro_minha_lista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cadastro_vinhos" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "uva" VARCHAR(50) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,
    "regiao" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(300),
    "nota_media" INTEGER NOT NULL,
    "historia" TEXT NOT NULL,
    "produtor" VARCHAR(100) NOT NULL,
    "teor_alcoolico" VARCHAR(50) NOT NULL,
    "amadurecimento" TEXT NOT NULL,
    "harmonizacao" TEXT NOT NULL,
    "olfativo" TEXT NOT NULL,
    "gustativo" TEXT NOT NULL,
    "temperatura_servico" TEXT NOT NULL,

    CONSTRAINT "cadastro_vinhos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lista_Vinhos" (
    "listaId" TEXT NOT NULL,
    "vinhoId" TEXT NOT NULL,

    CONSTRAINT "Lista_Vinhos_pkey" PRIMARY KEY ("listaId","vinhoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "cadastro_admin_pseudoNome_key" ON "cadastro_admin"("pseudoNome");

-- CreateIndex
CREATE UNIQUE INDEX "cadastro_admin_senha_key" ON "cadastro_admin"("senha");

-- CreateIndex
CREATE UNIQUE INDEX "cadastrar_usuarios_email_key" ON "cadastrar_usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cadastro_minha_lista_IdUsuario_key" ON "cadastro_minha_lista"("IdUsuario");

-- AddForeignKey
ALTER TABLE "cadastro_minha_lista" ADD CONSTRAINT "cadastro_minha_lista_IdUsuario_fkey" FOREIGN KEY ("IdUsuario") REFERENCES "cadastrar_usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista_Vinhos" ADD CONSTRAINT "Lista_Vinhos_listaId_fkey" FOREIGN KEY ("listaId") REFERENCES "cadastro_minha_lista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista_Vinhos" ADD CONSTRAINT "Lista_Vinhos_vinhoId_fkey" FOREIGN KEY ("vinhoId") REFERENCES "cadastro_vinhos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
