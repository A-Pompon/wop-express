const scoreService = require("../api/scores/scores.service");
const Score = require("../api/scores/scores.model");

jest.mock("../api/scores/scores.model");

describe("scoreService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should increment victories for a user", async () => {
    const userId = "dummyUserId";
    const gameId = "dummyGameId";

    Score.findOneAndUpdate.mockResolvedValueOnce({ victories: 1 });

    const updatedScore = await scoreService.updateScore(userId, gameId, {
      $inc: { victories: 1 },
    });

    expect(Score.findOneAndUpdate).toHaveBeenCalledWith(
      { user_id: userId, game_id: gameId },
      { $inc: { victories: 1 } },
      { new: true }
    );
    expect(updatedScore).toEqual({ victories: 1 });
  });

  it("should increment defeats for a user", async () => {
    const userId = "dummyUserId";
    const gameId = "dummyGameId";

    Score.findOneAndUpdate.mockResolvedValueOnce({ defeates: 1 });

    const updatedScore = await scoreService.updateScore(userId, gameId, {
      $inc: { defeates: 1 },
    });

    expect(Score.findOneAndUpdate).toHaveBeenCalledWith(
      { user_id: userId, game_id: gameId },
      { $inc: { defeates: 1 } },
      { new: true }
    );
    expect(updatedScore).toEqual({ defeates: 1 });
  });
});
