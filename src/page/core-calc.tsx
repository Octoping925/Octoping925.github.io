import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  CORE_EXP,
  EXP_CORE_EXP,
  REINFORCE_CORE_EXP_ARR,
  REINFORCE_CORE_PIECE,
  REINFORCE_CORE_PIECE_COST,
  SKILL_CORE_EXP_ARR,
  SKILL_CORE_PIECE_COST,
} from "../../constant/core-exp";

type Input = {
  coreType: "skill" | "reinforce";
  beforeCoreLevel: number;
  beforeCoreExpPercent: number;
  goalLevel: number;
};

type ResultState = {
  neededExp: number;
  needed1LvCoreAmount: number;
  averageNeededCoreAmount: number;
  maxNeededCoreAmount: number;
  neededExpCoreAmount: number;
};

export const CoreExpCalculator = () => {
  const [resultState, setResultState] = useState<ResultState>();

  const { handleSubmit, setValue } = useForm<Input>({
    defaultValues: { beforeCoreExpPercent: 0 },
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    const result = output(data);
    setResultState(result);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          코어 목표치까지 얼마 먹을까 계산기
        </h1>
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-blue-500 border-gray-600"
                name="coreType"
                value="skill"
                onChange={() => setValue("coreType", "skill")}
              />
              <span className="ml-3 text-gray-200">스킬코어</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-blue-500 border-gray-600"
                name="coreType"
                value="reinforce"
                onChange={() => setValue("coreType", "reinforce")}
              />
              <span className="ml-3 text-gray-200">강화코어</span>
            </label>
          </div>

          <div className="flex flex-col gap-5">
            <input
              type="number"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="강화하고 싶은 코어 레벨"
              onChange={(e) =>
                setValue("beforeCoreLevel", Number(e.target.value))
              }
            />

            <input
              type="number"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="강화하고 싶은 코어 경험치 %"
              defaultValue={0}
              onChange={(e) =>
                setValue("beforeCoreExpPercent", Number(e.target.value))
              }
            />

            <input
              type="number"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="목표 레벨"
              onChange={(e) => setValue("goalLevel", Number(e.target.value))}
            />

            <button
              className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              onClick={handleSubmit(onSubmit)}
            >
              계산하기
            </button>
          </div>
        </div>
      </div>

      {resultState && (
        <div className="m-5 p-8 bg-gray-800 rounded-xl shadow-lg">
          <div className="space-y-4">
            <p className="text-gray-200">
              필요한 경험치:{" "}
              <span className="text-blue-400 font-semibold">
                {resultState.neededExp}
              </span>
            </p>
            <p className="text-gray-200">
              필요한 1렙 코어의 갯수:{" "}
              <span className="text-blue-400 font-semibold">
                {resultState.needed1LvCoreAmount}개
              </span>
            </p>
            <p className="text-gray-200">
              평균적으로 필요한 코어 젬스톤의 갯수:{" "}
              <span className="text-blue-400 font-semibold">
                {resultState.averageNeededCoreAmount.toFixed(2)}개
              </span>
            </p>
            <p className="text-gray-200">
              최대 필요한 코어 젬스톤의 갯수:{" "}
              <span className="text-blue-400 font-semibold">
                {resultState.maxNeededCoreAmount.toFixed(2)}개
              </span>
            </p>
            <div className="my-6 border-t border-gray-700" />
            <p className="text-gray-200">
              필요한 경코젬의 갯수:{" "}
              <span className="text-blue-400 font-semibold">
                {resultState.neededExpCoreAmount.toFixed(2)}개
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

function output({
  coreType,
  beforeCoreLevel,
  beforeCoreExpPercent,
  goalLevel,
}: Input): ResultState {
  const expAmountArr =
    coreType === "skill" ? SKILL_CORE_EXP_ARR : REINFORCE_CORE_EXP_ARR;

  const levelToLevelExpAmount =
    expAmountArr[goalLevel] - expAmountArr[beforeCoreLevel];

  const currentLevelLeftExp =
    ((expAmountArr[beforeCoreLevel + 1] - expAmountArr[beforeCoreLevel]) *
      beforeCoreExpPercent) /
    100;

  const exp = levelToLevelExpAmount - currentLevelLeftExp;

  if (coreType === "skill") {
    return {
      neededExp: exp,
      needed1LvCoreAmount: exp / CORE_EXP,
      averageNeededCoreAmount: exp * 0.1302,
      maxNeededCoreAmount:
        (exp * SKILL_CORE_PIECE_COST) / REINFORCE_CORE_PIECE / CORE_EXP,
      neededExpCoreAmount: exp / EXP_CORE_EXP,
    };
  } else {
    return {
      neededExp: exp,
      needed1LvCoreAmount: exp / CORE_EXP,
      averageNeededCoreAmount: (exp * 2) / 45,
      maxNeededCoreAmount:
        (exp * REINFORCE_CORE_PIECE_COST) / REINFORCE_CORE_PIECE / CORE_EXP,
      neededExpCoreAmount: exp / EXP_CORE_EXP,
    };
  }
}
