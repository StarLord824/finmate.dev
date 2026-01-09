-- CreateTable
CREATE TABLE "public"."ArenaAgent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "personality" TEXT,
    "strategy" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArenaAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArenaSimulation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "market" TEXT NOT NULL,
    "marketType" TEXT NOT NULL,
    "interval" TEXT NOT NULL DEFAULT '1h',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "initialBalance" DOUBLE PRECISION NOT NULL DEFAULT 10000,
    "tickIntervalMs" INTEGER NOT NULL DEFAULT 1000,
    "priceImpact" DOUBLE PRECISION NOT NULL DEFAULT 0.001,
    "config" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "pausedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "errorMessage" TEXT,

    CONSTRAINT "ArenaSimulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArenaParticipation" (
    "id" TEXT NOT NULL,
    "simulationId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "finalBalance" DOUBLE PRECISION,
    "pnl" DOUBLE PRECISION,
    "pnlPercent" DOUBLE PRECISION,
    "sharpeRatio" DOUBLE PRECISION,
    "winRate" DOUBLE PRECISION,
    "totalTrades" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER,

    CONSTRAINT "ArenaParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArenaTrade" (
    "id" TEXT NOT NULL,
    "simulationId" TEXT NOT NULL,
    "participationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "action" TEXT NOT NULL,
    "asset" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "reasoning" TEXT,

    CONSTRAINT "ArenaTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArenaSnapshot" (
    "id" TEXT NOT NULL,
    "simulationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "tick" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "ArenaSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArenaLeaderboard" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "totalWins" INTEGER NOT NULL DEFAULT 0,
    "totalSimulations" INTEGER NOT NULL DEFAULT 0,
    "avgPnl" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avgPnlPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avgSharpe" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bestPnl" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "worstPnl" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArenaLeaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MarketDataCache" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "dataCount" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketDataCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArenaParticipation_simulationId_idx" ON "public"."ArenaParticipation"("simulationId");

-- CreateIndex
CREATE INDEX "ArenaParticipation_agentId_idx" ON "public"."ArenaParticipation"("agentId");

-- CreateIndex
CREATE UNIQUE INDEX "ArenaParticipation_simulationId_agentId_key" ON "public"."ArenaParticipation"("simulationId", "agentId");

-- CreateIndex
CREATE INDEX "ArenaTrade_simulationId_timestamp_idx" ON "public"."ArenaTrade"("simulationId", "timestamp");

-- CreateIndex
CREATE INDEX "ArenaTrade_participationId_idx" ON "public"."ArenaTrade"("participationId");

-- CreateIndex
CREATE INDEX "ArenaSnapshot_simulationId_timestamp_idx" ON "public"."ArenaSnapshot"("simulationId", "timestamp");

-- CreateIndex
CREATE INDEX "ArenaSnapshot_simulationId_tick_idx" ON "public"."ArenaSnapshot"("simulationId", "tick");

-- CreateIndex
CREATE UNIQUE INDEX "ArenaLeaderboard_agentId_key" ON "public"."ArenaLeaderboard"("agentId");

-- CreateIndex
CREATE INDEX "MarketDataCache_symbol_type_interval_idx" ON "public"."MarketDataCache"("symbol", "type", "interval");

-- CreateIndex
CREATE UNIQUE INDEX "MarketDataCache_symbol_type_interval_startTime_endTime_key" ON "public"."MarketDataCache"("symbol", "type", "interval", "startTime", "endTime");

-- AddForeignKey
ALTER TABLE "public"."ArenaParticipation" ADD CONSTRAINT "ArenaParticipation_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "public"."ArenaSimulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArenaParticipation" ADD CONSTRAINT "ArenaParticipation_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "public"."ArenaAgent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArenaTrade" ADD CONSTRAINT "ArenaTrade_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "public"."ArenaSimulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArenaTrade" ADD CONSTRAINT "ArenaTrade_participationId_fkey" FOREIGN KEY ("participationId") REFERENCES "public"."ArenaParticipation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArenaSnapshot" ADD CONSTRAINT "ArenaSnapshot_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "public"."ArenaSimulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
