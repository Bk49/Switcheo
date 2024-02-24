const input = 5

const sum_to_n_a = (n: number) => {
    let result = 0;

    for (let i = 1; i <= n; i++) {
        result += i;
    }

    return result;
};

const sum_to_n_b: (n: number) => number = (n) => {
    return n == 1 ? n : n + sum_to_n_b(n - 1);
};

const sum_to_n_c = (n: number) => {
    const ary = [...Array(n+1).keys()];
    return ary.reduce((prev, curr) => prev + curr)
};

console.log("Results with sum_to_n_a: "+sum_to_n_a(input));
console.log("Results with sum_to_n_b: "+sum_to_n_b(input));
console.log("Results with sum_to_n_c: "+sum_to_n_c(input));
