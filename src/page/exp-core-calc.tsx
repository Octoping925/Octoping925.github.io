import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  EXP_CORE_EXP,
  REINFORCE_CORE_EXP_ARR,
  SKILL_CORE_EXP_ARR,
} from "../../constant/core-exp";

type Input = {
  coreType: "skill" | "reinforce";
  beforeCoreLevel: number;
  beforeCoreExpPercent: number;
  willUseExpCoreAmount: number;
};

type ResultState = {
  afterCoreLevel: number;
  afterCoreExpPercent: number;
};

export const ExpCoreExpCalculator = () => {
  const [resultState, setResultState] = useState<ResultState>();

  const { handleSubmit, getValues, setValue } = useForm<Input>({
    defaultValues: { beforeCoreExpPercent: 0 },
  });
  const onSubmit: SubmitHandler<Input> = (data) => {
    const result = output(data);
    setResultState(result);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          경코젬 먹이면 몇 렙될까 계산기
        </h1>
        <div className="space-y-6">
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-blue-500 focus:ring-blue-500 h-5 w-5"
                name="coreType"
                value="skill"
                onChange={() => setValue("coreType", "skill")}
              />
              <span className="ml-2 text-white">스킬코어</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-blue-500 focus:ring-blue-500 h-5 w-5"
                name="coreType"
                value="reinforce"
                onChange={() => setValue("coreType", "reinforce")}
              />
              <span className="ml-2 text-white">강화코어</span>
            </label>
          </div>

          <div className="space-y-4">
            <input
              type="number"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="강화하고 싶은 코어 레벨"
              onChange={(e) =>
                setValue("beforeCoreLevel", Number(e.target.value))
              }
            />

            <input
              type="number"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="강화하고 싶은 코어 경험치 %"
              defaultValue={0}
              onChange={(e) =>
                setValue("beforeCoreExpPercent", Number(e.target.value))
              }
            />

            <input
              type="number"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="먹일 경험의 코어젬스톤 갯수"
              onChange={(e) =>
                setValue("willUseExpCoreAmount", Number(e.target.value))
              }
            />

            <button
              className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={handleSubmit(onSubmit)}
            >
              계산하기
            </button>
          </div>
        </div>
      </div>

      {resultState && (
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="space-y-3">
            <p className="text-white text-lg">
              먹인 후의 코어의 레벨:{" "}
              <span className="font-semibold text-blue-400">
                {resultState.afterCoreLevel}
              </span>
            </p>
            <p className="text-white text-lg">
              경험치:{" "}
              <span className="font-semibold text-blue-400">
                {resultState.afterCoreExpPercent.toFixed(2)}%
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
  willUseExpCoreAmount,
}: Input): ResultState {
  const expAmountArr =
    coreType === "skill" ? SKILL_CORE_EXP_ARR : REINFORCE_CORE_EXP_ARR;

  const currentLevelAmountExp =
    expAmountArr[beforeCoreLevel + 1] - expAmountArr[beforeCoreLevel];

  const expCoreExpAmount = willUseExpCoreAmount * EXP_CORE_EXP;

  const exp =
    expAmountArr[beforeCoreLevel] +
    (currentLevelAmountExp * beforeCoreExpPercent) / 100 +
    expCoreExpAmount;

  // findLastIndex가 지원되지 않아 reverse().findIndex()로 대체
  const reversedIndex = [...expAmountArr]
    .reverse()
    .findIndex((coreExp) => coreExp <= exp);
  const afterCoreLevel =
    reversedIndex === -1
      ? expAmountArr.length - 1
      : expAmountArr.length - 1 - reversedIndex;

  const afterCoreExpPercent =
    afterCoreLevel < 25
      ? ((exp - expAmountArr[afterCoreLevel]) /
          (expAmountArr[afterCoreLevel + 1] - expAmountArr[afterCoreLevel])) *
        100
      : 0;

  return { afterCoreExpPercent, afterCoreLevel };
}
