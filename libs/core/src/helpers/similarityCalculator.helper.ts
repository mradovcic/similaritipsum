//Similarity between two texts will be calculated using Dice coefficient

export class SimilarityCalculator {
  public static calculateSimilarity(str1: string, str2: string) {
    const bigrams1 = this.getBigrams(str1);
    const bigrams2 = this.getBigrams(str2);
    return (
      (2 * SimilarityCalculator.intersect(bigrams1, bigrams2).size) /
      (bigrams1.size + bigrams2.size)
    );
  }

  private static getBigrams(str: string): Set<string> {
    const bigrams = new Set<string>();
    for (let i = 0; i < str.length - 1; i += 1) {
      bigrams.add(str.substring(i, i + 2));
    }
    return bigrams;
  }

  private static intersect(set1: Set<string>, set2: Set<string>) {
    return new Set([...set1].filter((x) => set2.has(x)));
  }
}
