export const resolve = {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    resolve: {
        // ... rest of the resolve config
        fallback: {
          "stream": require.resolve("stream-browserify"),
          "crypto": require.resolve("crypto-browserify"),
        }
      },
};