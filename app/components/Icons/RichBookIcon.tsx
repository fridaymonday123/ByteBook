import * as React from "react";

type Props = {
  /** The size of the icon, 24px is default to match standard icons */
  size?: number;
  /** The color of the icon, defaults to the current text color */
  color?: string;
  /** Whether the safe area should be removed and have graphic across full size */
  cover?: boolean;
};

export default function RidingCat100Icon({
  size = 100,
  cover,
  color = "currentColor",
}: Props) {
  return (
    <svg
      id="svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox={"0 0 {size}"}
      version="1.1"
    >
    <g id="svgg">
      <path
        id="path0"
        d="M39.45 22.5c-0.034 0.055 -0.284 0.1 -0.556 0.1 -0.272 0 -0.494 0.041 -0.494 0.091 0 0.05 -0.236 0.112 -0.525 0.137 -0.502 0.045 -1.511 0.239 -2.475 0.476 -0.247 0.061 -0.596 0.135 -0.775 0.165 -0.179 0.029 -0.325 0.094 -0.325 0.143 0 0.049 -0.155 0.089 -0.344 0.089 -0.189 0 -0.372 0.045 -0.406 0.1 -0.034 0.055 -0.194 0.1 -0.356 0.1 -0.162 0 -0.294 0.045 -0.294 0.1 0 0.055 -0.135 0.1 -0.3 0.1 -0.165 0 -0.3 0.045 -0.3 0.1 0 0.055 -0.135 0.1 -0.3 0.1 -0.165 0 -0.3 0.045 -0.3 0.1 0 0.055 -0.113 0.1 -0.25 0.1s-0.25 0.045 -0.25 0.1c0 0.055 -0.135 0.1 -0.3 0.1 -0.165 0 -0.3 0.045 -0.3 0.1 0 0.055 -0.135 0.1 -0.3 0.1 -0.165 0 -0.3 0.045 -0.3 0.1 0 0.055 -0.11 0.1 -0.244 0.1 -0.134 0 -0.272 0.045 -0.306 0.1 -0.034 0.055 -0.149 0.1 -0.256 0.1 -0.107 0 -0.194 0.045 -0.194 0.1 0 0.055 -0.135 0.1 -0.3 0.1 -0.165 0 -0.3 0.045 -0.3 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.113 0.1 -0.25 0.1s-0.25 0.045 -0.25 0.1c0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.088 0.1 -0.197 0.1 -0.219 0 -0.935 0.308 -0.987 0.425 -0.018 0.041 -0.12 0.075 -0.225 0.075 -0.105 0 -0.192 0.045 -0.192 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.036 -0.2 0.081 0 0.045 -0.158 0.143 -0.35 0.219 -0.193 0.075 -0.35 0.174 -0.35 0.219 0 0.045 -0.09 0.081 -0.2 0.081 -0.11 0 -0.2 0.04 -0.2 0.088 0 0.049 -0.135 0.144 -0.3 0.212 -0.165 0.068 -0.3 0.164 -0.3 0.212 0 0.048 -0.09 0.088 -0.2 0.088 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.08 0.1 -0.178 0.1 -0.098 0 -0.243 0.09 -0.322 0.2 -0.079 0.11 -0.203 0.2 -0.276 0.2 -0.073 0 -0.229 0.09 -0.347 0.2 -0.118 0.11 -0.274 0.2 -0.346 0.2 -0.072 0 -0.131 0.045 -0.131 0.1 0 0.055 -0.059 0.1 -0.131 0.1 -0.072 0 -0.228 0.09 -0.346 0.2 -0.118 0.11 -0.252 0.2 -0.297 0.2 -0.045 0 -0.147 0.09 -0.226 0.2 -0.079 0.11 -0.205 0.2 -0.279 0.2 -0.074 0 -0.198 0.056 -0.275 0.125 -0.341 0.306 -0.446 0.375 -0.57 0.375 -0.073 0 -0.197 0.09 -0.276 0.2 -0.079 0.11 -0.195 0.2 -0.257 0.2 -0.062 0 -0.254 0.135 -0.427 0.3 -0.173 0.165 -0.364 0.3 -0.425 0.3s-0.237 0.135 -0.391 0.3c-0.154 0.165 -0.324 0.3 -0.378 0.3 -0.054 0 -0.283 0.18 -0.51 0.4 -0.227 0.22 -0.438 0.4 -0.469 0.4 -0.031 0 -0.276 0.225 -0.543 0.5s-0.536 0.5 -0.596 0.5c-0.105 0 -0.282 0.152 -1.252 1.075 -0.245 0.234 -0.479 0.425 -0.52 0.425 -0.076 0 -3.732 3.679 -3.732 3.756 0 0.024 -0.316 0.363 -0.703 0.754 -0.387 0.391 -0.775 0.851 -0.863 1.021 -0.088 0.171 -0.335 0.477 -0.547 0.682 -0.213 0.204 -0.387 0.424 -0.387 0.487s-0.18 0.288 -0.4 0.5c-0.22 0.211 -0.4 0.411 -0.4 0.443 0 0.033 -0.135 0.2 -0.3 0.373 -0.165 0.173 -0.3 0.353 -0.3 0.4 0 0.047 -0.135 0.227 -0.3 0.4 -0.165 0.173 -0.3 0.365 -0.3 0.427 0 0.062 -0.09 0.178 -0.2 0.257 -0.11 0.079 -0.2 0.214 -0.2 0.3 0 0.086 -0.09 0.221 -0.2 0.3 -0.11 0.079 -0.2 0.224 -0.2 0.322 0 0.098 -0.042 0.178 -0.093 0.178s-0.172 0.18 -0.269 0.4c-0.097 0.22 -0.213 0.4 -0.257 0.4 -0.044 0 -0.081 0.058 -0.081 0.128 0 0.07 -0.09 0.193 -0.2 0.272 -0.11 0.079 -0.2 0.224 -0.2 0.322 0 0.098 -0.045 0.178 -0.1 0.178 -0.055 0 -0.1 0.08 -0.1 0.178 0 0.098 -0.09 0.243 -0.2 0.322 -0.11 0.079 -0.2 0.214 -0.2 0.3 0 0.086 -0.09 0.221 -0.2 0.3 -0.257 0.185 -0.257 0.615 0 0.8 0.11 0.079 0.2 0.214 0.2 0.3 0 0.086 0.09 0.221 0.2 0.3 0.11 0.079 0.2 0.224 0.2 0.322 0 0.098 0.045 0.178 0.1 0.178 0.055 0 0.1 0.058 0.1 0.128 0 0.07 0.09 0.193 0.2 0.272 0.11 0.079 0.2 0.224 0.2 0.322 0 0.098 0.036 0.178 0.081 0.178 0.044 0 0.16 0.18 0.257 0.4 0.097 0.22 0.218 0.4 0.269 0.4 0.051 0 0.093 0.08 0.093 0.178 0 0.098 0.09 0.243 0.2 0.322 0.11 0.079 0.2 0.195 0.2 0.257 0 0.062 0.135 0.254 0.3 0.427 0.165 0.173 0.3 0.364 0.3 0.425s0.135 0.237 0.3 0.391c0.165 0.154 0.3 0.326 0.3 0.381 0 0.056 0.135 0.214 0.3 0.353 0.165 0.139 0.3 0.304 0.3 0.367 0 0.063 0.18 0.287 0.4 0.498 0.22 0.211 0.4 0.434 0.4 0.495 0 0.061 0.146 0.26 0.325 0.443 0.469 0.478 0.775 0.851 0.775 0.945 0 0.045 0.304 0.383 0.675 0.751 1.855 1.842 3.05 3.039 3.783 3.788 0.892 0.913 1.745 1.677 1.873 1.677 0.045 0 0.302 0.225 0.57 0.5s0.534 0.5 0.592 0.5c0.058 0 0.299 0.191 0.536 0.425 0.566 0.557 1.3 1.175 1.397 1.175 0.043 0 0.218 0.135 0.391 0.3 0.173 0.165 0.354 0.3 0.404 0.3 0.049 0 0.211 0.113 0.359 0.25 0.148 0.138 0.339 0.25 0.424 0.25 0.085 0 0.219 0.09 0.298 0.2 0.079 0.11 0.214 0.2 0.3 0.2 0.086 0 0.221 0.09 0.3 0.2 0.079 0.11 0.192 0.2 0.25 0.2 0.058 0 0.171 0.09 0.25 0.2 0.079 0.11 0.214 0.2 0.3 0.2 0.086 0 0.221 0.09 0.3 0.2 0.079 0.11 0.203 0.2 0.276 0.2 0.073 0 0.229 0.09 0.347 0.2 0.118 0.11 0.274 0.2 0.346 0.2 0.072 0 0.131 0.045 0.131 0.1 0 0.055 0.08 0.1 0.178 0.1 0.098 0 0.243 0.09 0.322 0.2 0.079 0.11 0.224 0.2 0.322 0.2 0.098 0 0.178 0.045 0.178 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.08 0.1 0.178 0.1 0.098 0 0.243 0.09 0.322 0.2 0.079 0.11 0.221 0.2 0.314 0.2 0.093 0 0.184 0.035 0.203 0.079 0.049 0.114 1.124 0.621 1.318 0.621 0.091 0 0.165 0.045 0.165 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.113 0.1 0.25 0.1s0.25 0.045 0.25 0.1c0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.113 0.1 0.25 0.1s0.25 0.045 0.25 0.1c0 0.055 0.113 0.1 0.25 0.1s0.25 0.045 0.25 0.1c0 0.055 0.11 0.1 0.244 0.1 0.134 0 0.272 0.045 0.306 0.1 0.034 0.055 0.149 0.1 0.256 0.1 0.107 0 0.194 0.045 0.194 0.1 0 0.055 0.135 0.1 0.3 0.1 0.165 0 0.3 0.045 0.3 0.1 0 0.055 0.135 0.1 0.3 0.1 0.165 0 0.3 0.045 0.3 0.1 0 0.055 0.11 0.1 0.244 0.1 0.134 0 0.272 0.045 0.306 0.1 0.034 0.055 0.172 0.1 0.306 0.1 0.134 0 0.244 0.045 0.244 0.1 0 0.055 0.135 0.1 0.3 0.1 0.165 0 0.3 0.045 0.3 0.1 0 0.055 0.132 0.1 0.294 0.1 0.162 0 0.322 0.045 0.356 0.1 0.034 0.055 0.195 0.1 0.357 0.1s0.373 0.042 0.469 0.092c0.221 0.118 1.502 0.408 1.799 0.408 0.124 0 0.225 0.045 0.225 0.1 0 0.055 0.225 0.1 0.5 0.1 0.282 0 0.5 0.046 0.5 0.105 0 0.135 1.122 0.082 1.166 -0.055 0.034 -0.105 -0.412 -0.35 -0.636 -0.35 -0.071 0 -0.13 -0.045 -0.13 -0.1 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.08 -0.1 -0.178 -0.1 -0.098 0 -0.243 -0.09 -0.322 -0.2 -0.079 -0.11 -0.224 -0.2 -0.322 -0.2 -0.098 0 -0.178 -0.045 -0.178 -0.1 0 -0.055 -0.058 -0.1 -0.128 -0.1 -0.07 0 -0.193 -0.09 -0.272 -0.2 -0.079 -0.11 -0.214 -0.2 -0.3 -0.2 -0.086 0 -0.221 -0.09 -0.3 -0.2 -0.079 -0.11 -0.195 -0.2 -0.257 -0.2 -0.062 0 -0.254 -0.135 -0.427 -0.3 -0.173 -0.165 -0.359 -0.3 -0.415 -0.3 -0.056 0 -0.286 -0.18 -0.513 -0.4 -0.227 -0.22 -0.453 -0.4 -0.504 -0.4 -0.095 0 -0.287 -0.162 -1.034 -0.875 -0.245 -0.234 -0.469 -0.425 -0.499 -0.425 -0.095 0 -1.751 -1.694 -1.751 -1.791 0 -0.051 -0.315 -0.412 -0.7 -0.802 -0.385 -0.39 -0.7 -0.731 -0.7 -0.757 0 -0.027 -0.18 -0.235 -0.4 -0.462 -0.22 -0.227 -0.4 -0.472 -0.4 -0.545 0 -0.073 -0.113 -0.246 -0.25 -0.384s-0.25 -0.309 -0.25 -0.383c0 -0.073 -0.09 -0.197 -0.2 -0.277 -0.11 -0.079 -0.2 -0.214 -0.2 -0.3 0 -0.086 -0.09 -0.221 -0.2 -0.3 -0.11 -0.079 -0.2 -0.224 -0.2 -0.322 0 -0.098 -0.045 -0.178 -0.1 -0.178 -0.055 0 -0.1 -0.059 -0.1 -0.131 0 -0.072 -0.081 -0.218 -0.18 -0.325 -0.1 -0.106 -0.245 -0.34 -0.325 -0.519 -0.079 -0.179 -0.178 -0.325 -0.22 -0.325 -0.042 0 -0.075 -0.09 -0.075 -0.2 0 -0.11 -0.045 -0.2 -0.1 -0.2 -0.055 0 -0.1 -0.09 -0.1 -0.2 0 -0.11 -0.045 -0.2 -0.1 -0.2 -0.055 0 -0.1 -0.09 -0.1 -0.2 0 -0.11 -0.045 -0.2 -0.1 -0.2 -0.055 0 -0.1 -0.09 -0.1 -0.2 0 -0.11 -0.045 -0.2 -0.1 -0.2 -0.055 0 -0.1 -0.09 -0.1 -0.2 0 -0.11 -0.045 -0.2 -0.1 -0.2 -0.055 0 -0.1 -0.09 -0.1 -0.2 0 -0.11 -0.045 -0.2 -0.1 -0.2 -0.055 0 -0.1 -0.135 -0.1 -0.3 0 -0.165 -0.045 -0.3 -0.1 -0.3 -0.055 0 -0.1 -0.09 -0.1 -0.2 0 -0.11 -0.045 -0.2 -0.1 -0.2 -0.055 0 -0.1 -0.113 -0.1 -0.25s-0.039 -0.25 -0.087 -0.25c-0.048 0 -0.118 -0.235 -0.157 -0.522 -0.038 -0.287 -0.106 -0.569 -0.15 -0.625 -0.076 -0.096 -0.138 -0.353 -0.272 -1.129 -0.031 -0.179 -0.097 -0.35 -0.145 -0.381 -0.049 -0.03 -0.089 -0.23 -0.089 -0.443 0 -0.213 -0.045 -0.416 -0.1 -0.45 -0.055 -0.034 -0.1 -0.262 -0.1 -0.506 0 -0.244 -0.045 -0.444 -0.1 -0.444 -0.056 0 -0.1 -0.265 -0.1 -0.594 0 -0.327 -0.045 -0.622 -0.1 -0.656 -0.055 -0.034 -0.1 -0.464 -0.1 -0.956 0 -0.529 -0.041 -0.894 -0.1 -0.894 -0.064 0 -0.1 -0.865 -0.1 -2.394 0 -1.488 0.038 -2.417 0.1 -2.456 0.055 -0.034 0.1 -0.462 0.1 -0.95 0 -0.488 0.045 -0.916 0.1 -0.95 0.055 -0.034 0.1 -0.304 0.1 -0.6s0.045 -0.566 0.1 -0.6c0.055 -0.034 0.1 -0.259 0.1 -0.5s0.045 -0.466 0.1 -0.5c0.055 -0.034 0.1 -0.236 0.1 -0.45 0 -0.213 0.045 -0.416 0.1 -0.45 0.055 -0.034 0.1 -0.192 0.1 -0.35 0 -0.159 0.04 -0.313 0.089 -0.343 0.049 -0.03 0.115 -0.202 0.146 -0.381 0.147 -0.837 0.315 -1.476 0.386 -1.476 0.043 0 0.079 -0.135 0.079 -0.3 0 -0.165 0.045 -0.3 0.1 -0.3 0.055 0 0.1 -0.09 0.1 -0.2 0 -0.11 0.045 -0.2 0.1 -0.2 0.055 0 0.1 -0.113 0.1 -0.25s0.045 -0.25 0.1 -0.25c0.055 0 0.1 -0.09 0.1 -0.2 0 -0.11 0.045 -0.2 0.1 -0.2 0.055 0 0.1 -0.09 0.1 -0.2 0 -0.11 0.045 -0.2 0.1 -0.2 0.055 0 0.1 -0.087 0.1 -0.194 0 -0.107 0.045 -0.222 0.1 -0.256 0.055 -0.034 0.1 -0.141 0.1 -0.237 0 -0.097 0.09 -0.272 0.2 -0.39 0.11 -0.118 0.2 -0.284 0.2 -0.369 0 -0.085 0.045 -0.154 0.1 -0.154 0.055 0 0.1 -0.09 0.1 -0.2 0 -0.11 0.045 -0.2 0.1 -0.2 0.055 0 0.1 -0.09 0.1 -0.2 0 -0.11 0.045 -0.2 0.1 -0.2 0.055 0 0.1 -0.08 0.1 -0.178 0 -0.098 0.09 -0.243 0.2 -0.322 0.11 -0.079 0.2 -0.202 0.2 -0.272 0 -0.07 0.037 -0.128 0.083 -0.128 0.046 0 0.147 -0.124 0.225 -0.275 0.078 -0.151 0.221 -0.362 0.317 -0.469 0.096 -0.107 0.175 -0.253 0.175 -0.325 0 -0.072 0.04 -0.131 0.088 -0.131 0.049 0 0.168 -0.169 0.266 -0.375 0.098 -0.206 0.26 -0.448 0.361 -0.537 0.102 -0.089 0.184 -0.215 0.184 -0.281 0 -0.066 0.225 -0.339 0.5 -0.607s0.5 -0.513 0.5 -0.544c0 -0.032 0.596 -0.655 1.325 -1.385 0.729 -0.731 1.438 -1.472 1.575 -1.648 0.138 -0.176 0.306 -0.321 0.374 -0.321 0.069 -0.001 0.354 -0.226 0.635 -0.501 0.281 -0.275 0.572 -0.5 0.646 -0.5 0.074 0 0.239 -0.101 0.365 -0.225s0.353 -0.289 0.504 -0.367c0.151 -0.078 0.275 -0.179 0.275 -0.225 0 -0.045 0.059 -0.083 0.131 -0.083 0.072 0 0.228 -0.09 0.346 -0.2 0.118 -0.11 0.262 -0.2 0.319 -0.2 0.057 0 0.104 -0.037 0.104 -0.083 0 -0.046 0.124 -0.147 0.275 -0.225 0.151 -0.077 0.348 -0.22 0.437 -0.317 0.089 -0.097 0.235 -0.176 0.325 -0.176 0.09 0 0.163 -0.045 0.163 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.113 -0.1 0.25 -0.1s0.25 -0.045 0.25 -0.1c0 -0.055 0.111 -0.1 0.245 -0.1 0.336 0 0.755 -0.203 0.755 -0.366 0 -0.162 -1.351 -0.194 -1.45 -0.034"
        stroke="none"
        fill="#fc9c04"
        fillRule="evenodd"
        strokeWidth={0.25}
      />
      <path
        id="path1"
        d="M62 23.05c0 0.2 0.05 0.25 0.25 0.25 0.138 0 0.25 0.045 0.25 0.1 0 0.055 0.113 0.1 0.25 0.1s0.25 0.045 0.25 0.1c0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.036 0.2 0.081 0 0.045 0.158 0.143 0.35 0.219 0.193 0.075 0.35 0.174 0.35 0.219 0 0.045 0.068 0.081 0.15 0.081 0.083 0 0.15 0.045 0.15 0.1 0 0.055 0.068 0.1 0.15 0.1 0.083 0 0.15 0.045 0.15 0.1 0 0.055 0.08 0.1 0.178 0.1 0.098 0 0.243 0.09 0.322 0.2 0.079 0.11 0.214 0.2 0.3 0.2 0.086 0 0.221 0.09 0.3 0.2 0.079 0.11 0.202 0.2 0.273 0.2 0.071 0 0.27 0.135 0.443 0.3 0.173 0.165 0.355 0.3 0.406 0.3 0.051 0 0.151 0.056 0.224 0.125 0.072 0.069 0.257 0.215 0.409 0.325 0.152 0.11 0.568 0.481 0.922 0.825 0.355 0.344 0.685 0.625 0.735 0.625 0.098 0 1.987 1.861 1.987 1.957 0 0.056 0.184 0.263 0.975 1.094 0.179 0.188 0.325 0.393 0.325 0.455 0 0.062 0.135 0.239 0.3 0.394 0.165 0.154 0.3 0.323 0.3 0.375 0 0.052 0.135 0.236 0.3 0.409 0.165 0.173 0.3 0.372 0.3 0.443 0 0.071 0.09 0.194 0.2 0.273 0.11 0.079 0.2 0.193 0.2 0.253 0 0.06 0.079 0.196 0.175 0.303 0.096 0.106 0.239 0.318 0.317 0.469 0.078 0.151 0.179 0.275 0.225 0.275 0.045 0 0.083 0.068 0.083 0.15 0 0.083 0.045 0.15 0.1 0.15 0.055 0 0.1 0.08 0.1 0.178 0 0.098 0.09 0.243 0.2 0.322 0.11 0.079 0.2 0.224 0.2 0.322 0 0.098 0.045 0.178 0.1 0.178 0.055 0 0.1 0.09 0.1 0.2 0 0.11 0.045 0.2 0.1 0.2 0.055 0 0.1 0.079 0.101 0.175 0 0.096 0.113 0.397 0.25 0.667 0.137 0.271 0.249 0.552 0.249 0.625 0 0.073 0.045 0.133 0.1 0.133 0.055 0 0.1 0.081 0.1 0.18 0 0.224 0.224 0.718 0.325 0.719 0.041 0.001 0.075 0.136 0.075 0.301s0.045 0.3 0.1 0.3c0.055 0 0.1 0.135 0.1 0.3 0 0.165 0.045 0.3 0.1 0.3 0.055 0 0.1 0.11 0.1 0.244 0 0.134 0.045 0.272 0.1 0.306 0.055 0.034 0.1 0.194 0.1 0.356 0 0.162 0.045 0.294 0.1 0.294 0.055 0 0.1 0.132 0.1 0.294 0 0.162 0.045 0.322 0.1 0.356 0.055 0.034 0.1 0.192 0.1 0.35 0 0.159 0.045 0.316 0.1 0.35 0.055 0.034 0.1 0.262 0.1 0.506 0 0.244 0.045 0.444 0.1 0.444 0.055 0 0.1 0.225 0.1 0.5s0.045 0.5 0.1 0.5c0.056 0 0.1 0.281 0.1 0.644 0 0.354 0.045 0.672 0.1 0.706 0.057 0.035 0.1 0.532 0.1 1.15 0 0.618 0.043 1.115 0.1 1.15 0.06 0.037 0.1 0.699 0.1 1.65s-0.04 1.613 -0.1 1.65c-0.057 0.035 -0.1 0.534 -0.1 1.156 0 0.663 -0.04 1.094 -0.1 1.094 -0.056 0 -0.1 0.281 -0.1 0.644 0 0.354 -0.045 0.672 -0.1 0.706 -0.055 0.034 -0.1 0.259 -0.1 0.5s-0.045 0.466 -0.1 0.5c-0.055 0.034 -0.1 0.239 -0.1 0.456 0 0.217 -0.045 0.394 -0.1 0.394 -0.055 0 -0.1 0.155 -0.1 0.344 0 0.189 -0.045 0.372 -0.1 0.406 -0.055 0.034 -0.1 0.217 -0.1 0.406 0 0.189 -0.045 0.344 -0.1 0.344 -0.055 0 -0.1 0.135 -0.1 0.3 0 0.165 -0.045 0.3 -0.1 0.3 -0.055 0 -0.1 0.135 -0.1 0.3 0 0.165 -0.045 0.3 -0.1 0.3 -0.055 0 -0.1 0.11 -0.1 0.244 0 0.134 -0.045 0.272 -0.1 0.306 -0.055 0.034 -0.1 0.172 -0.1 0.306 0 0.134 -0.045 0.244 -0.1 0.244 -0.055 0 -0.1 0.09 -0.1 0.2 0 0.11 -0.045 0.2 -0.1 0.2 -0.055 0 -0.1 0.087 -0.1 0.194 0 0.107 -0.045 0.222 -0.1 0.256 -0.055 0.034 -0.1 0.172 -0.1 0.306 0 0.134 -0.045 0.244 -0.1 0.244 -0.055 0 -0.1 0.062 -0.1 0.139 0 0.076 -0.067 0.268 -0.149 0.425 -0.082 0.158 -0.149 0.365 -0.15 0.462 0 0.096 -0.045 0.175 -0.101 0.175 -0.055 0 -0.1 0.08 -0.1 0.178 0 0.098 -0.09 0.243 -0.2 0.322 -0.11 0.079 -0.2 0.202 -0.2 0.272 0 0.07 -0.045 0.128 -0.1 0.128 -0.055 0 -0.1 0.07 -0.1 0.154 0 0.085 -0.09 0.251 -0.2 0.369 -0.11 0.118 -0.2 0.274 -0.2 0.346 0 0.072 -0.045 0.131 -0.1 0.131 -0.055 0 -0.1 0.08 -0.1 0.178 0 0.098 -0.09 0.243 -0.2 0.322 -0.11 0.079 -0.2 0.206 -0.2 0.282 0 0.076 -0.135 0.264 -0.3 0.418 -0.165 0.154 -0.3 0.334 -0.3 0.4 0 0.066 -0.135 0.246 -0.3 0.4 -0.165 0.154 -0.3 0.333 -0.3 0.398 0 0.065 -0.18 0.29 -0.4 0.502 -0.22 0.211 -0.4 0.43 -0.4 0.485 0 0.134 -3.562 3.715 -3.695 3.715 -0.057 0 -0.309 0.203 -0.56 0.45 -0.251 0.247 -0.49 0.45 -0.531 0.45 -0.041 0 -0.246 0.158 -0.457 0.35 -0.21 0.193 -0.419 0.35 -0.465 0.35 -0.045 0 -0.196 0.113 -0.333 0.25s-0.309 0.25 -0.383 0.25c-0.073 0 -0.197 0.09 -0.277 0.2 -0.079 0.11 -0.214 0.2 -0.3 0.2 -0.086 0 -0.221 0.09 -0.3 0.2 -0.079 0.11 -0.224 0.2 -0.322 0.2 -0.098 0 -0.178 0.036 -0.178 0.081 0 0.045 -0.158 0.143 -0.35 0.219 -0.193 0.075 -0.35 0.174 -0.35 0.219 0 0.045 -0.071 0.081 -0.157 0.081 -0.221 0 -0.443 0.247 -0.443 0.493 0 0.154 0.064 0.207 0.25 0.207 0.138 0 0.25 -0.042 0.25 -0.094 0 -0.052 0.203 -0.124 0.451 -0.162 0.248 -0.037 0.476 -0.107 0.506 -0.156 0.03 -0.049 0.207 -0.088 0.393 -0.088s0.366 -0.045 0.4 -0.1c0.034 -0.055 0.169 -0.1 0.3 -0.1 0.131 0 0.266 -0.045 0.3 -0.1 0.034 -0.055 0.194 -0.1 0.356 -0.1 0.162 0 0.294 -0.045 0.294 -0.1 0 -0.055 0.11 -0.1 0.244 -0.1 0.134 0 0.272 -0.045 0.306 -0.1 0.034 -0.055 0.172 -0.1 0.306 -0.1 0.134 0 0.244 -0.045 0.244 -0.1 0 -0.055 0.135 -0.1 0.3 -0.1 0.165 0 0.3 -0.045 0.3 -0.1 0 -0.055 0.135 -0.1 0.3 -0.1 0.165 0 0.3 -0.045 0.3 -0.1 0 -0.055 0.087 -0.1 0.194 -0.1 0.107 0 0.222 -0.045 0.256 -0.1 0.034 -0.055 0.172 -0.1 0.306 -0.1 0.134 0 0.244 -0.045 0.244 -0.1 0 -0.055 0.087 -0.1 0.194 -0.1 0.107 0 0.222 -0.045 0.256 -0.1 0.034 -0.055 0.172 -0.1 0.306 -0.1 0.134 0 0.244 -0.045 0.244 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.113 -0.1 0.25 -0.1s0.25 -0.045 0.25 -0.1c0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.066 -0.1 0.147 -0.1 0.184 0 1.259 -0.5 1.428 -0.665 0.069 -0.067 0.215 -0.151 0.325 -0.185 0.11 -0.035 0.2 -0.105 0.2 -0.157 0 -0.051 0.09 -0.093 0.2 -0.093 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.07 -0.1 0.154 -0.1 0.085 0 0.251 -0.09 0.369 -0.2 0.118 -0.11 0.274 -0.2 0.346 -0.2 0.072 0 0.131 -0.045 0.131 -0.1 0 -0.055 0.08 -0.1 0.178 -0.1 0.098 0 0.243 -0.09 0.322 -0.2 0.079 -0.11 0.224 -0.2 0.322 -0.2 0.098 0 0.178 -0.045 0.178 -0.1 0 -0.055 0.068 -0.1 0.15 -0.1 0.083 0 0.15 -0.045 0.15 -0.1 0 -0.055 0.068 -0.1 0.15 -0.1 0.083 0 0.15 -0.045 0.15 -0.1 0 -0.055 0.068 -0.1 0.15 -0.1 0.083 0 0.15 -0.045 0.15 -0.1 0 -0.055 0.068 -0.1 0.15 -0.1 0.083 0 0.15 -0.045 0.15 -0.1 0 -0.055 0.058 -0.1 0.128 -0.1 0.07 0 0.193 -0.09 0.272 -0.2 0.079 -0.11 0.193 -0.2 0.253 -0.2 0.06 0 0.201 -0.085 0.312 -0.189 0.112 -0.104 0.356 -0.269 0.544 -0.365 0.187 -0.097 0.413 -0.259 0.502 -0.36 0.089 -0.102 0.217 -0.185 0.285 -0.185 0.068 0 0.249 -0.135 0.404 -0.3 0.154 -0.165 0.323 -0.3 0.375 -0.3 0.052 0 0.236 -0.135 0.409 -0.3 0.173 -0.165 0.34 -0.3 0.371 -0.3 0.032 0 0.277 -0.225 0.544 -0.5s0.537 -0.5 0.599 -0.5c0.062 0 0.377 -0.27 0.701 -0.6 0.324 -0.33 0.626 -0.6 0.671 -0.6 0.123 0 1.003 -0.775 1.576 -1.387 0.277 -0.295 1.279 -1.31 2.228 -2.253 0.949 -0.944 1.725 -1.75 1.725 -1.791 0 -0.041 0.146 -0.224 0.325 -0.406 0.502 -0.511 0.775 -0.853 0.775 -0.969 0 -0.058 0.225 -0.325 0.5 -0.593s0.5 -0.539 0.5 -0.604c0 -0.064 0.135 -0.242 0.3 -0.397 0.165 -0.154 0.3 -0.312 0.3 -0.35 0 -0.038 0.135 -0.196 0.3 -0.35 0.165 -0.154 0.3 -0.334 0.3 -0.4 0 -0.066 0.135 -0.246 0.3 -0.4 0.165 -0.154 0.3 -0.342 0.3 -0.418 0 -0.076 0.09 -0.203 0.2 -0.282 0.11 -0.079 0.2 -0.191 0.2 -0.247 0 -0.057 0.108 -0.228 0.239 -0.381 0.131 -0.153 0.294 -0.411 0.362 -0.575 0.068 -0.164 0.163 -0.297 0.211 -0.297 0.048 0 0.088 -0.067 0.088 -0.149 0 -0.137 0.158 -0.371 0.475 -0.705 0.069 -0.072 0.125 -0.193 0.125 -0.267 0 -0.074 0.09 -0.2 0.2 -0.279 0.11 -0.079 0.2 -0.214 0.2 -0.3 0 -0.086 0.09 -0.221 0.2 -0.3 0.11 -0.08 0.2 -0.259 0.2 -0.4 0 -0.141 -0.09 -0.321 -0.2 -0.4 -0.11 -0.079 -0.2 -0.214 -0.2 -0.3 0 -0.086 -0.09 -0.221 -0.2 -0.3 -0.11 -0.079 -0.2 -0.224 -0.2 -0.322 0 -0.098 -0.045 -0.178 -0.1 -0.178 -0.055 0 -0.1 -0.068 -0.1 -0.15 0 -0.083 -0.045 -0.15 -0.1 -0.15 -0.055 0 -0.1 -0.068 -0.1 -0.15 0 -0.083 -0.045 -0.15 -0.1 -0.15 -0.055 0 -0.1 -0.068 -0.1 -0.15 0 -0.083 -0.038 -0.15 -0.085 -0.15 -0.047 0 -0.166 -0.18 -0.265 -0.4 -0.099 -0.22 -0.218 -0.4 -0.265 -0.4 -0.046 0 -0.085 -0.061 -0.085 -0.135 0 -0.074 -0.135 -0.276 -0.3 -0.449 -0.165 -0.173 -0.3 -0.372 -0.3 -0.443 0 -0.071 -0.09 -0.194 -0.2 -0.273 -0.11 -0.079 -0.2 -0.195 -0.2 -0.257 0 -0.062 -0.135 -0.254 -0.3 -0.427 -0.165 -0.173 -0.3 -0.353 -0.3 -0.4 0 -0.047 -0.135 -0.227 -0.3 -0.4 -0.165 -0.173 -0.3 -0.34 -0.3 -0.373 0 -0.032 -0.18 -0.232 -0.4 -0.443 -0.22 -0.211 -0.4 -0.424 -0.4 -0.472 0 -0.049 -0.146 -0.249 -0.325 -0.447 -0.593 -0.653 -0.775 -0.881 -0.775 -0.972 0 -0.049 -0.45 -0.542 -1 -1.094 -0.55 -0.553 -1 -1.031 -1 -1.063 0 -0.072 -2.122 -2.161 -3.151 -3.102a119.707 119.707 0 0 1 -1.003 -0.925c-0.131 -0.124 -0.287 -0.225 -0.348 -0.225s-0.33 -0.225 -0.598 -0.5 -0.557 -0.5 -0.643 -0.5c-0.086 0 -0.157 -0.044 -0.157 -0.099 0 -0.119 -0.594 -0.701 -0.715 -0.701 -0.047 0 -0.271 -0.18 -0.497 -0.4 -0.227 -0.22 -0.454 -0.4 -0.504 -0.4 -0.051 0 -0.205 -0.113 -0.343 -0.25 -0.138 -0.138 -0.286 -0.25 -0.33 -0.25 -0.044 0 -0.211 -0.113 -0.37 -0.25 -0.16 -0.137 -0.327 -0.25 -0.372 -0.25 -0.045 0 -0.229 -0.113 -0.409 -0.25 -0.18 -0.138 -0.37 -0.25 -0.421 -0.25 -0.051 0 -0.159 -0.09 -0.238 -0.2 -0.079 -0.11 -0.202 -0.2 -0.272 -0.2 -0.07 0 -0.128 -0.045 -0.128 -0.1 0 -0.055 -0.059 -0.1 -0.131 -0.1 -0.072 0 -0.228 -0.09 -0.346 -0.2 -0.118 -0.11 -0.274 -0.2 -0.347 -0.2 -0.073 0 -0.197 -0.09 -0.276 -0.2 -0.079 -0.11 -0.203 -0.2 -0.276 -0.2 -0.073 0 -0.229 -0.09 -0.347 -0.2 -0.118 -0.11 -0.274 -0.2 -0.346 -0.2 -0.072 0 -0.131 -0.045 -0.131 -0.1 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.08 -0.1 -0.178 -0.1 -0.098 0 -0.243 -0.09 -0.322 -0.2 -0.079 -0.11 -0.224 -0.2 -0.322 -0.2 -0.098 0 -0.178 -0.034 -0.178 -0.075 0 -0.041 -0.248 -0.188 -0.55 -0.325 -0.302 -0.138 -0.549 -0.284 -0.55 -0.325 0 -0.041 -0.09 -0.075 -0.2 -0.075 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.062 -0.1 -0.139 -0.1 -0.076 0 -0.268 -0.067 -0.425 -0.149 -0.158 -0.082 -0.365 -0.149 -0.462 -0.15 -0.096 0 -0.175 -0.045 -0.175 -0.101 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.113 -0.1 -0.25 -0.1s-0.25 -0.045 -0.25 -0.1c0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.087 -0.1 -0.194 -0.1 -0.107 0 -0.222 -0.045 -0.256 -0.1 -0.034 -0.055 -0.172 -0.1 -0.306 -0.1 -0.134 0 -0.244 -0.045 -0.244 -0.1 0 -0.055 -0.087 -0.1 -0.194 -0.1 -0.107 0 -0.222 -0.045 -0.256 -0.1 -0.034 -0.055 -0.172 -0.1 -0.306 -0.1 -0.134 0 -0.244 -0.045 -0.244 -0.1 0 -0.055 -0.135 -0.1 -0.3 -0.1 -0.165 0 -0.3 -0.045 -0.3 -0.1 0 -0.055 -0.135 -0.1 -0.3 -0.1 -0.165 0 -0.3 -0.045 -0.3 -0.1 0 -0.055 -0.11 -0.1 -0.244 -0.1 -0.134 0 -0.272 -0.045 -0.306 -0.1 -0.034 -0.055 -0.172 -0.1 -0.306 -0.1 -0.134 0 -0.244 -0.045 -0.244 -0.1 0 -0.055 -0.135 -0.1 -0.3 -0.1 -0.165 0 -0.3 -0.045 -0.3 -0.1 0 -0.055 -0.132 -0.1 -0.294 -0.1 -0.162 0 -0.322 -0.045 -0.356 -0.1 -0.034 -0.055 -0.217 -0.1 -0.406 -0.1 -0.189 0 -0.344 -0.04 -0.344 -0.089 0 -0.049 -0.146 -0.113 -0.325 -0.143a12.199 12.199 0 0 1 -0.775 -0.167c-0.247 -0.062 -0.72 -0.159 -1.05 -0.216 -0.33 -0.057 -0.643 -0.144 -0.695 -0.195 -0.23 -0.221 -0.855 -0.105 -0.855 0.159m-6.751 6.367c-0.527 0.504 -1.053 1.055 -1.168 1.225 -0.115 0.17 0.069 0.006 0.409 -0.362s0.897 -0.92 1.239 -1.224c0.342 -0.305 0.589 -0.554 0.55 -0.554 -0.039 0 -0.503 0.412 -1.03 0.916m-1.968 2.408c-0.363 0.573 -0.989 2.224 -0.973 2.567 0.004 0.087 0.093 -0.133 0.199 -0.49 0.105 -0.356 0.37 -1.02 0.588 -1.475 0.394 -0.822 0.46 -1.032 0.186 -0.602m-1.117 3.084c-0.035 0.174 -0.057 0.502 -0.05 0.729 0.009 0.305 0.034 0.23 0.094 -0.285 0.086 -0.738 0.062 -0.973 -0.044 -0.443m-0.131 1.941c0.001 0.385 0.018 0.53 0.04 0.323 0.022 -0.207 0.021 -0.522 -0.001 -0.7 -0.022 -0.177 -0.04 -0.008 -0.04 0.377m0.077 1.258c0.005 0.243 0.046 0.554 0.09 0.692 0.048 0.15 0.059 -0.01 0.026 -0.4 -0.064 -0.759 -0.131 -0.928 -0.117 -0.292m0.202 1.192c-0.005 0.138 0.035 0.318 0.088 0.4 0.123 0.191 0.123 -0.015 0 -0.4l-0.08 -0.25 -0.009 0.25m18.859 1.953c-0.147 0.301 -0.247 0.547 -0.221 0.547 0.067 0 0.572 -1.012 0.527 -1.057 -0.021 -0.021 -0.158 0.209 -0.306 0.51m-17.87 0.61c0 0.111 0.876 1.294 1.066 1.44 0.139 0.107 0.132 0.081 -0.029 -0.105 -0.117 -0.136 -0.382 -0.506 -0.589 -0.822 -0.36 -0.55 -0.449 -0.651 -0.449 -0.513m17.159 0.613c-0.249 0.388 -0.284 0.477 -0.109 0.275 0.255 -0.293 0.593 -0.85 0.516 -0.85 -0.021 0 -0.204 0.259 -0.407 0.575m-1.309 1.472c-0.44 0.449 -0.958 0.941 -1.15 1.093 -0.193 0.152 -0.257 0.23 -0.142 0.174 0.181 -0.089 1.109 -0.87 1.392 -1.17l0.495 -0.525c0.722 -0.764 0.218 -0.402 -0.595 0.428m-14.15 0.103c0.186 0.193 0.376 0.35 0.421 0.35 0.045 0 -0.08 -0.158 -0.278 -0.35 -0.198 -0.193 -0.388 -0.35 -0.421 -0.35 -0.034 0 0.092 0.158 0.278 0.35m0.699 0.586c0.173 0.225 1.501 1.14 1.501 1.034 0 -0.023 -0.259 -0.211 -0.575 -0.418s-0.686 -0.472 -0.822 -0.589c-0.19 -0.164 -0.214 -0.17 -0.104 -0.027m11.276 1.022c-0.374 0.203 -0.351 0.287 0.025 0.093 0.165 -0.085 0.3 -0.176 0.3 -0.203 0 -0.065 -0.011 -0.061 -0.325 0.11m-0.875 0.443c-0.193 0.105 -0.305 0.192 -0.25 0.192 0.055 0 0.258 -0.086 0.45 -0.192 0.193 -0.105 0.305 -0.192 0.25 -0.192 -0.055 0 -0.258 0.086 -0.45 0.192m-7.4 0.3c0.083 0.053 0.217 0.097 0.3 0.097 0.133 0 0.133 -0.011 0 -0.097 -0.083 -0.053 -0.217 -0.097 -0.3 -0.097 -0.133 0 -0.133 0.011 0 0.097m0.65 0.2c0.11 0.047 0.29 0.085 0.4 0.083 0.161 -0.002 0.151 -0.019 -0.05 -0.083 -0.342 -0.11 -0.605 -0.11 -0.35 0m5.2 0 -0.2 0.086 0.2 0.005c0.11 0.003 0.268 -0.038 0.35 -0.091 0.199 -0.129 -0.051 -0.129 -0.35 0m-4.3 0.198c0.189 0.083 1.13 0.143 1.042 0.066 -0.023 -0.02 -0.312 -0.063 -0.642 -0.095 -0.381 -0.037 -0.527 -0.027 -0.4 0.029m3.1 0.002 -0.5 0.069 0.45 0.006c0.247 0.003 0.563 -0.03 0.7 -0.074 0.311 -0.1 0.076 -0.1 -0.65 0"
        stroke="none"
        fill="#1484c3"
        fillRule="evenodd"
        strokeWidth={0.25}
      />
      <path
        id="path2"
        d="M61.05 26.6c-0.034 0.055 -0.352 0.1 -0.706 0.1 -0.363 0 -0.644 0.044 -0.644 0.1 0 0.055 -0.132 0.1 -0.294 0.1 -0.162 0 -0.319 0.04 -0.349 0.088 -0.03 0.049 -0.246 0.118 -0.481 0.153 -0.595 0.091 -1.679 0.657 -1.869 0.976 -0.086 0.146 -0.427 0.486 -0.757 0.758 -6.943 5.704 -3.989 16.64 4.837 17.901 1.548 0.221 3.016 0.081 4.766 -0.456 2.158 -0.662 4.689 -3.006 5.747 -5.322 0.138 -0.301 0.284 -0.563 0.327 -0.581 0.213 -0.094 0.373 -0.361 0.373 -0.623 0 -0.161 0.045 -0.293 0.1 -0.293 0.055 0 0.1 -0.171 0.1 -0.38s0.047 -0.427 0.104 -0.484c0.207 -0.207 0.002 -4.535 -0.214 -4.535 -0.05 0 -0.09 -0.155 -0.09 -0.344 0 -0.189 -0.045 -0.372 -0.1 -0.406 -0.055 -0.034 -0.1 -0.149 -0.1 -0.256 0 -0.107 -0.045 -0.194 -0.1 -0.194 -0.055 0 -0.1 -0.089 -0.1 -0.197 0 -0.183 -0.343 -0.89 -0.487 -1.003 -0.035 -0.028 -0.131 -0.185 -0.213 -0.35 -0.082 -0.165 -0.274 -0.419 -0.425 -0.565 -0.151 -0.146 -0.275 -0.316 -0.275 -0.377 0 -0.108 -1.445 -1.608 -1.549 -1.608 -0.029 0 -0.194 -0.135 -0.366 -0.3 -0.173 -0.165 -0.354 -0.3 -0.403 -0.3 -0.049 0 -0.186 -0.09 -0.304 -0.2 -0.118 -0.11 -0.274 -0.2 -0.346 -0.2 -0.072 0 -0.131 -0.045 -0.131 -0.1 0 -0.055 -0.09 -0.1 -0.2 -0.1 -0.11 0 -0.2 -0.045 -0.2 -0.1 0 -0.055 -0.062 -0.1 -0.139 -0.1 -0.076 0 -0.268 -0.067 -0.425 -0.149 -0.158 -0.082 -0.41 -0.149 -0.561 -0.15 -0.151 0 -0.275 -0.045 -0.275 -0.101 0 -0.055 -0.18 -0.1 -0.4 -0.1 -0.22 0 -0.4 -0.045 -0.4 -0.1 0 -0.057 -0.283 -0.1 -0.65 -0.1s-0.65 -0.043 -0.65 -0.1c0 -0.06 -0.415 -0.1 -1.044 -0.1 -0.588 0 -1.071 0.044 -1.106 0.1"
        stroke="none"
        fill="#fbfbfb"
        fillRule="evenodd"
        strokeWidth={0.25}
      />
      <path
        id="path3"
        d="M48.762 27.471c-0.043 0.043 -0.446 0.113 -0.895 0.155 -1.582 0.149 -1.867 0.192 -1.867 0.282 0 0.05 -0.18 0.091 -0.4 0.091 -0.22 0 -0.4 0.045 -0.4 0.1 0 0.055 -0.136 0.1 -0.301 0.1s-0.38 0.041 -0.475 0.09c-0.096 0.05 -0.376 0.147 -0.624 0.217 -0.247 0.07 -0.493 0.164 -0.545 0.21 -0.052 0.045 -0.199 0.083 -0.325 0.083s-0.23 0.045 -0.23 0.1c0 0.055 -0.135 0.1 -0.3 0.1 -0.165 0 -0.3 0.045 -0.3 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.045 -0.2 0.1 0 0.055 -0.09 0.1 -0.2 0.1 -0.11 0 -0.2 0.034 -0.2 0.075 0 0.042 -0.146 0.14 -0.325 0.217 -0.179 0.078 -0.398 0.224 -0.487 0.325 -0.089 0.1 -0.235 0.182 -0.325 0.182 -0.09 0 -0.164 0.034 -0.165 0.075 -0.001 0.041 -0.18 0.161 -0.4 0.266 -0.219 0.105 -0.399 0.229 -0.399 0.275 0 0.046 -0.061 0.084 -0.135 0.084 -0.074 0 -0.276 0.135 -0.449 0.3 -0.173 0.165 -0.35 0.3 -0.395 0.3 -0.22 0 -3.321 3.032 -3.321 3.247 0 0.084 -0.045 0.153 -0.1 0.153 -0.128 0 -0.9 0.791 -0.9 0.922 0 0.054 -0.135 0.224 -0.3 0.378 -0.165 0.154 -0.3 0.342 -0.3 0.418 0 0.076 -0.09 0.203 -0.2 0.282 -0.11 0.079 -0.2 0.224 -0.2 0.322 0 0.098 -0.042 0.178 -0.093 0.178s-0.172 0.18 -0.269 0.4c-0.097 0.22 -0.213 0.4 -0.257 0.4 -0.044 0 -0.081 0.09 -0.081 0.2 0 0.11 -0.045 0.2 -0.1 0.2 -0.055 0 -0.1 0.09 -0.1 0.2 0 0.11 -0.045 0.2 -0.1 0.2 -0.055 0 -0.1 0.068 -0.1 0.15 0 0.083 -0.045 0.15 -0.1 0.15 -0.055 0 -0.1 0.09 -0.1 0.2 0 0.11 -0.045 0.2 -0.1 0.2 -0.055 0 -0.1 0.09 -0.1 0.2 0 0.11 -0.045 0.2 -0.1 0.2 -0.055 0 -0.1 0.09 -0.1 0.2 0 0.11 -0.045 0.2 -0.1 0.2 -0.055 0 -0.1 0.09 -0.1 0.2 0 0.11 -0.045 0.2 -0.1 0.2 -0.055 0 -0.1 0.135 -0.1 0.3 0 0.165 -0.045 0.3 -0.1 0.3 -0.055 0 -0.1 0.09 -0.1 0.2 0 0.11 -0.045 0.2 -0.1 0.2 -0.055 0 -0.1 0.135 -0.1 0.3 0 0.165 -0.045 0.3 -0.1 0.3 -0.055 0 -0.1 0.135 -0.1 0.3 0 0.165 -0.045 0.3 -0.1 0.3 -0.055 0 -0.1 0.158 -0.1 0.35 0 0.193 -0.045 0.35 -0.1 0.35 -0.055 0 -0.1 0.18 -0.1 0.4 0 0.22 -0.045 0.4 -0.1 0.4 -0.055 0 -0.1 0.225 -0.1 0.5s-0.041 0.5 -0.091 0.5c-0.218 0 -0.423 7.325 -0.211 7.537 0.057 0.057 0.103 0.361 0.103 0.677 0 0.316 0.045 0.602 0.1 0.636 0.055 0.034 0.1 0.259 0.1 0.5s0.045 0.466 0.1 0.5c0.055 0.034 0.1 0.239 0.1 0.456 0 0.217 0.045 0.394 0.1 0.394 0.055 0 0.1 0.135 0.1 0.3 0 0.165 0.045 0.3 0.1 0.3 0.055 0 0.1 0.135 0.1 0.3 0 0.165 0.045 0.3 0.1 0.3 0.055 0 0.1 0.135 0.1 0.3 0 0.165 0.045 0.3 0.1 0.3 0.055 0 0.1 0.135 0.1 0.3 0 0.165 0.045 0.3 0.1 0.3 0.055 0 0.1 0.09 0.1 0.2 0 0.11 0.045 0.2 0.1 0.2 0.055 0 0.1 0.113 0.1 0.25s0.045 0.25 0.1 0.25c0.055 0 0.1 0.09 0.1 0.2 0 0.11 0.045 0.2 0.1 0.2 0.055 0 0.1 0.09 0.1 0.2 0 0.11 0.045 0.2 0.1 0.2 0.055 0 0.1 0.09 0.1 0.2 0 0.11 0.045 0.2 0.1 0.2 0.055 0 0.1 0.08 0.1 0.178 0 0.098 0.09 0.243 0.2 0.322 0.11 0.079 0.2 0.224 0.2 0.322 0 0.098 0.045 0.178 0.1 0.178 0.055 0 0.1 0.085 0.1 0.188s0.068 0.244 0.15 0.312c0.083 0.069 0.15 0.178 0.15 0.243 0 0.065 0.079 0.206 0.175 0.313 0.096 0.106 0.239 0.318 0.317 0.469 0.078 0.151 0.179 0.275 0.225 0.275 0.045 0 0.083 0.049 0.083 0.108 0 0.059 0.18 0.281 0.4 0.492 0.22 0.211 0.4 0.431 0.4 0.489 0 0.141 3.243 3.411 3.383 3.411 0.061 0 0.268 0.158 0.46 0.35 0.193 0.193 0.409 0.35 0.481 0.35 0.072 0 0.196 0.09 0.276 0.2 0.079 0.11 0.193 0.2 0.253 0.2 0.06 0 0.196 0.079 0.303 0.175 0.106 0.096 0.318 0.239 0.469 0.317 0.151 0.078 0.275 0.179 0.275 0.225 0 0.045 0.073 0.083 0.163 0.083 0.09 0 0.236 0.082 0.325 0.182 0.089 0.101 0.308 0.246 0.487 0.325 0.179 0.078 0.325 0.176 0.325 0.217 0 0.042 0.09 0.075 0.2 0.075 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.087 0.1 0.194 0.1 0.107 0 0.222 0.045 0.256 0.1 0.034 0.055 0.172 0.1 0.306 0.1 0.134 0 0.244 0.045 0.244 0.1 0 0.055 0.09 0.1 0.2 0.1 0.11 0 0.2 0.045 0.2 0.1 0 0.055 0.135 0.1 0.3 0.1 0.165 0 0.3 0.045 0.3 0.1 0 0.055 0.126 0.1 0.28 0.1 0.154 0 0.328 0.048 0.386 0.106 0.058 0.058 0.36 0.132 0.67 0.164s0.564 0.097 0.564 0.144c0 0.047 0.18 0.086 0.4 0.086 0.22 0 0.4 0.045 0.4 0.1 0 0.055 0.225 0.1 0.5 0.1s0.5 0.045 0.5 0.1c0 0.057 0.3 0.1 0.7 0.1 0.4 0 0.7 0.043 0.7 0.1 0 0.064 1.033 0.1 2.9 0.1s2.9 -0.036 2.9 -0.1c0 -0.057 0.3 -0.1 0.7 -0.1 0.4 0 0.7 -0.043 0.7 -0.1 0 -0.055 0.203 -0.1 0.45 -0.1s0.45 -0.045 0.45 -0.1c0 -0.055 0.18 -0.1 0.4 -0.1 0.22 0 0.4 -0.038 0.4 -0.086 0 -0.047 0.279 -0.115 0.621 -0.151 0.342 -0.035 0.665 -0.11 0.72 -0.164 0.055 -0.055 0.2 -0.1 0.324 -0.1s0.252 -0.045 0.286 -0.1c0.034 -0.055 0.139 -0.1 0.234 -0.1 0.094 0 0.441 -0.134 0.769 -0.297 0.329 -0.164 0.676 -0.298 0.772 -0.3 0.096 -0.002 0.175 -0.048 0.175 -0.103 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.09 -0.1 0.2 -0.1 0.11 0 0.2 -0.045 0.2 -0.1 0 -0.055 0.059 -0.1 0.131 -0.1 0.072 0 0.228 -0.09 0.346 -0.2 0.118 -0.11 0.284 -0.2 0.369 -0.2 0.085 0 0.154 -0.045 0.154 -0.1 0 -0.055 0.08 -0.1 0.178 -0.1 0.098 0 0.243 -0.09 0.322 -0.2 0.079 -0.11 0.214 -0.2 0.3 -0.2 0.086 0 0.221 -0.09 0.3 -0.2 0.079 -0.11 0.201 -0.2 0.271 -0.2 0.07 0 0.183 -0.09 0.252 -0.2 0.069 -0.11 0.186 -0.2 0.261 -0.2 0.075 0 0.256 -0.128 0.402 -0.285 0.146 -0.157 0.41 -0.359 0.586 -0.451 0.497 -0.257 3.328 -3.126 3.328 -3.373 0 -0.059 0.18 -0.28 0.4 -0.491 0.22 -0.211 0.4 -0.423 0.4 -0.47 0 -0.047 0.09 -0.151 0.2 -0.23 0.11 -0.079 0.2 -0.214 0.2 -0.3 0 -0.086 0.09 -0.221 0.2 -0.3 0.11 -0.079 0.2 -0.214 0.2 -0.3 0 -0.086 0.09 -0.221 0.2 -0.3 0.11 -0.079 0.2 -0.224 0.2 -0.322 0 -0.098 0.045 -0.178 0.1 -0.178 0.055 0 0.1 -0.08 0.1 -0.178 0 -0.098 0.09 -0.243 0.2 -0.322 0.11 -0.079 0.2 -0.224 0.2 -0.322 0 -0.098 0.045 -0.178 0.1 -0.178 0.055 0 0.1 -0.09 0.1 -0.2 0 -0.11 0.045 -0.2 0.1 -0.2 0.055 0 0.1 -0.09 0.1 -0.2 0 -0.11 0.045 -0.2 0.1 -0.2 0.055 0 0.1 -0.089 0.1 -0.197 0 -0.108 0.083 -0.344 0.183 -0.525 0.242 -0.434 0.517 -1.256 0.517 -1.546 0 -0.128 0.045 -0.232 0.1 -0.232 0.055 0 0.1 -0.135 0.1 -0.3 0 -0.165 0.045 -0.3 0.1 -0.3 0.055 0 0.1 -0.18 0.1 -0.4 0 -0.22 0.045 -0.4 0.1 -0.4 0.055 0 0.1 -0.155 0.1 -0.344 0 -0.189 0.045 -0.372 0.1 -0.406 0.055 -0.034 0.1 -0.259 0.1 -0.5s0.045 -0.466 0.1 -0.5c0.055 -0.034 0.1 -0.349 0.1 -0.7s0.045 -0.666 0.1 -0.7c0.063 -0.039 0.1 -1.118 0.1 -2.906 0 -1.829 -0.036 -2.844 -0.1 -2.844 -0.058 0 -0.1 -0.315 -0.1 -0.744 0 -0.409 -0.045 -0.772 -0.1 -0.806 -0.055 -0.034 -0.1 -0.259 -0.1 -0.5s-0.045 -0.466 -0.1 -0.5c-0.055 -0.034 -0.1 -0.214 -0.1 -0.4 0 -0.186 -0.045 -0.366 -0.1 -0.4 -0.055 -0.034 -0.1 -0.169 -0.1 -0.3 0 -0.131 -0.045 -0.266 -0.1 -0.3 -0.055 -0.034 -0.1 -0.217 -0.1 -0.406 0 -0.189 -0.04 -0.344 -0.089 -0.344 -0.049 0 -0.119 -0.202 -0.156 -0.448 -0.037 -0.246 -0.101 -0.468 -0.141 -0.493 -0.041 -0.025 -0.137 -0.274 -0.212 -0.552 -0.076 -0.279 -0.175 -0.506 -0.22 -0.506 -0.045 0 -0.082 -0.09 -0.082 -0.2 0 -0.11 -0.045 -0.2 -0.1 -0.2 -0.055 0 -0.1 -0.09 -0.1 -0.2 0 -0.491 -0.231 -0.235 -0.839 0.932 -1.301 2.495 -3.703 4.487 -6.211 5.151 -1.021 0.271 -1.438 0.317 -2.843 0.317 -7.026 0 -11.813 -6.766 -9.541 -13.484 0.571 -1.687 2.031 -3.649 3.559 -4.781 0.526 -0.39 0.613 -0.635 0.225 -0.635 -0.138 0 -0.25 -0.041 -0.25 -0.09 0 -0.05 -0.236 -0.118 -0.525 -0.152 -0.289 -0.034 -0.885 -0.11 -1.325 -0.169 -0.982 -0.132 -5.38 -0.226 -5.488 -0.118"
        stroke="none"
        fill="#040404"
        fillRule="evenodd"
        strokeWidth={0.25}
      />
    </g>
  </svg>
  );
}